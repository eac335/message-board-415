const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Subscribe to a topic
router.post('/subscribe', subscriptionController.subscribe);

// Unsubscribe from a topic
router.post('/unsubscribe', subscriptionController.unsubscribe);

// Get all topics the user is subscribed to
router.get('/subscribed/:userId', subscriptionController.getUserSubscriptions);

// Get topics the user is NOT subscribed to
router.get('/available/:userId', subscriptionController.getAvailableTopics);

module.exports = router;
