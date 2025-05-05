const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Post a new message (user must be subscribed to the topic)
router.post('/post', messageController.postMessage);

// Get the 2 most recent messages from each topic a user is subscribed to
router.get('/recent/:userId', messageController.getRecentMessagesByUser);

module.exports = router;
