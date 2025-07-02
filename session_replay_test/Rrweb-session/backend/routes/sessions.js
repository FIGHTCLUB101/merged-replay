// backend/routes/sessions.js
const express = require('express');
const router = express.Router();
const {
  createSession,
  uploadChunk,
  listSessions,
  getSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, createSession);
router.post('/:id/chunks', authenticateJWT, uploadChunk);
router.get('/', authenticateJWT, listSessions);
router.get('/:id', authenticateJWT, getSession);
router.put('/:id', authenticateJWT, updateSession);
router.delete('/:id', authenticateJWT, deleteSession);
module.exports = router;