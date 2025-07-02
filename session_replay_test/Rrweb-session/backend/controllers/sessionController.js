
const Session = require('../models/Session');


exports.createSession = async function (req, res) {
  try {
    const session = new Session({
      userId: req.user.id,
      teamId: req.user.teamId, // required in schema
      events: [],
      tags: [],
      notes: ''
    });
    await session.save();
    res.status(201).json({ sessionId: session._id });
  } catch (err) {
    console.error('❌ createSession error:', err);
    res.status(500).json({ message: 'Error creating session', error: err.message });
  }
};

exports.uploadChunk = async (req, res) => {
  const { id: sessionId } = req.params;
  const { events } = req.body;

  if (!events || events.length === 0) {
    return res.status(400).json({ message: 'No events provided' });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.events.push(...events); // ✅ Add to existing events array
    session.endTime = new Date();
    await session.save();

    res.status(200).json({ message: 'Chunk uploaded' });
  } catch (err) {
    console.error('❌ uploadChunk error:', err);
    res.status(500).json({ message: 'Error saving chunk', error: err.message });
  }
};




exports.listSessions = async (req, res) => {
  console.log('👉 listSessions called. req.user =', req.user);
  try {
    const sessions = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 });
    console.log(`🚗 Found ${sessions.length} sessions`);
    res.status(200).json({ sessions });
  } catch (err) {
    console.error('❌ Error in listSessions:', err);
    res.status(500).json({ message: 'Error fetching sessions', error: err.toString() });
  }
};


exports.getSession = async (req, res) => {
  try {
    console.log('🔍 Getting session for ID:', req.params.id);
    console.log('👤 Authenticated user:', req.user);

    const session = await Session.findById(req.params.id);

    if (!session) {
      console.warn('⚠️ Session not found for ID:', req.params.id);
      return res.status(404).json({ message: 'Session not found' });
    }

    if (String(session.userId) !== String(req.user.id)) {
      console.warn('⛔ Forbidden: Session belongs to another user.');
      return res.status(403).json({ message: 'Forbidden' });
    }

    const events = session.events; // 🔧 Must match schema
    res.status(200).json({
      session: {
        _id: session._id,
        events,
        tags: session.tags,
        notes: session.notes,
        createdAt: session.createdAt
      }
    });
  } catch (err) {
    console.error('🔥 getSession error:', err.stack);
    res.status(500).json({ message: 'Error getting session', error: err.message });
  }
};


// Update session tags or notes
exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    if (String(session.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    session.tags = req.body.tags || session.tags;
    session.notes = req.body.notes || session.notes;
    await session.save();

    res.status(200).json({ message: 'Session updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating session', error: err });
  }
};

// Delete a session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    if (String(session.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await session.deleteOne();
    res.status(200).json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting session', error: err });
  }
};
