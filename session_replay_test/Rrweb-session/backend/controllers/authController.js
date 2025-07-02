const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');

// Signup: create a new user and optionally a new team or join existing
async function signup(req, res, next) {
  try {
    const { email, password, teamName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    let team;
    if (teamName) {
      // Create new team, user becomes admin
      team = await Team.create({ name: teamName, memberIds: [] });
    } else {
      return res.status(400).json({ message: 'teamName is required to create account' });
    }
    const user = await User.create({
      email,
      passwordHash,
      teamId: team._id,
      role: 'admin'
    });
    // Add user to team memberIds
    team.memberIds.push(user._id);
    await team.save();
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, teamId: user.teamId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
}

// Login: authenticate and return JWT

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, teamId: user.teamId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // ✅ Set token as HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      //secure: process.env.NODE_ENV === 'production', // use HTTPS in production
      sameSite: 'Lax', // or 'None' if you're doing cross-origin with credentials
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    // ✅ Optional: Also send some data if needed (e.g., user info)
    res.json({ token, message: 'Login successful' });

  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login };