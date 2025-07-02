// backend/routes/teams.js
const express = require('express');
const router = express.Router();
const { createTeam, addMember } = require('../controllers/teamController');
const { checkRole } = require('../middleware/rbacMiddleware');

// Only authenticated (JWT) users reach here; further: only admin can create teams or add members
router.post('/', checkRole(['admin']), createTeam);
router.post('/:id/members', checkRole(['admin']), addMember);

module.exports = router;