// backend/controllers/teamController.js
const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team (admin user only)
async function createTeam(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Team name is required' });
    const team = await Team.create({ name, memberIds: [] });
    res.status(201).json({ team });
  } catch (err) {
    next(err);
  }
}

// Add a user to a team by email (admin only)
async function addMember(req, res, next) {
  try {
    const teamId = req.params.id;
    const { email, role } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    // Only admin of this team can add
    // (RBAC middleware ensures req.user.role is admin)
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    // Find or create user? For simplicity, only existing users can be added
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.teamId && user.teamId.toString() !== teamId) {
      return res.status(400).json({ message: 'User already in another team' });
    }
    user.teamId = team._id;
    user.role = role || 'viewer';
    await user.save();
    team.memberIds.push(user._id);
    await team.save();
    res.json({ message: 'User added to team' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createTeam, addMember };