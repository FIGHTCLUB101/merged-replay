// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// router.get('/me', async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     console.error('Error fetching user:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;

// routes/user.js
// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/user/me
router.get('/me', async (req, res) => {
  
  
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

module.exports = router;



