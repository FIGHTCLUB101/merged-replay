require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams');
const sessionRoutes = require('./routes/sessions');
const userRoutes = require('./routes/user');
const { authenticateJWT } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/sessions', require('./routes/sessions'));
// Public routes (no auth required)


// Protected routes (auth required)
app.use('/api/user', authenticateJWT, userRoutes);
app.use('/api/teams', authenticateJWT, teamRoutes);
//app.use('/api/sessions', authenticateJWT, sessionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Background job to mark old sessions as completed
const Session = require('./models/Session');

async function markOldSessionsAsCompleted() {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    const sessions = await Session.find({
      $or: [{ endTime: { $exists: false } }, { endTime: null }],
      startTime: { $lt: tenMinutesAgo }
    });
    for (const session of sessions) {
      session.endTime = new Date();
      await session.save();
      console.log(`Marked session ${session._id} as completed.`);
    }
  } catch (err) {
    console.error('Error marking old sessions as completed:', err);
  }
}

setInterval(markOldSessionsAsCompleted, 5 * 60 * 1000); // every 5 minutes

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));

module.exports = app;
