require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser'); // ✅ NEW

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // ✅ NEW

// Health check (for Render deployment)
app.get('/health', (_, res) => res.send('👍 Backend is working!'));

// API Routes
const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/users', userRoutes);
app.use('/topics', topicRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/messages', messageRoutes);

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve login/register page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve topic dashboard page
app.get('/topics', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'topics.html'));
});

// Route to serve single topic detail page
app.get('/topic', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'topic.html'));
});

// MongoDB connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(3000, () => {
      console.log('✅ Server running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
