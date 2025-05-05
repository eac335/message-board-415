const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

// Post a message to a topic (user must be subscribed)
router.post('/post', controller.postMessage);

// Get the 2 most recent messages per topic for a user
router.get('/recent/:userId', controller.getRecentMessagesByUser);

module.exports = router;
