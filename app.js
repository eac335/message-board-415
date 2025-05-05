require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// Health check route (used by Render)
app.get('/health', (req, res) => {
  res.send('👍 Backend is working!');
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Mount API routes
app.use('/users', userRoutes);
app.use('/topics', topicRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/messages', messageRoutes);

// Serve frontend (static HTML)
app.use(express.static(path.join(__dirname, 'public')));



// Start server after DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(3000, () => {
      console.log('✅ Server listening at http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
