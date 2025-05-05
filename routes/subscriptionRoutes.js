const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscriptionController');

// Subscribe a user to a topic
router.post('/subscribe', controller.subscribe);

// Unsubscribe a user from a topic
router.post('/unsubscribe', controller.unsubscribe);

// Get topics available for a user to subscribe to
router.get('/available/:userId', controller.getAvailableTopics);

// Get topics a user is subscribed to
router.get('/subscribed/:userId', controller.getUserSubscriptions);

module.exports = router;
