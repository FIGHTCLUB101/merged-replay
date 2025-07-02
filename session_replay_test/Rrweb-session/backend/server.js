require('dotenv').config();
const connectDB = require('./db');
const app = require('./app'); // ✅ Use app defined in app.js
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server once DB is connected
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
