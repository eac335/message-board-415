const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Post a new message (user must be subscribed)
router.post('/post', messageController.postMessage);

// Get 2 most recent messages from each topic a user is subscribed to
router.get('/recent/:userId', messageController.getRecentMessagesByUser);

// ✅ Get all messages in a specific topic (for topic.html)
router.get('/topic/:topicId', messageController.getMessagesByTopicId);

module.exports = router;
