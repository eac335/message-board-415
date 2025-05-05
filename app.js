require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express(); // must come first

// Import routes
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const messageRoutes = require('./routes/messageRoutes'); // ✅ added

app.use(express.json());

// ✅ Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Mount backend API routes
app.use('/users', userRoutes);                // /users/create, /users/login
app.use('/topics', topicRoutes);              // /topics/create, /topics/:id
app.use('/subscriptions', subscriptionRoutes); // /subscriptions/subscribe, /unsubscribe, etc.
app.use('/messages', messageRoutes);          // ✅ /messages/post, /messages/recent/:userId

// Test route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(3000, () => {
      console.log('✅ Server listening on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
