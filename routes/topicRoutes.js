const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Create a new topic
router.post('/create', topicController.createTopic);

// Get all topics
router.get('/', topicController.getAllTopics);

// Get topic stats
router.get('/stats', topicController.getTopicStats);

// Get a specific topic by ID (increments view count)
router.get('/view/:id', topicController.getTopicById);

module.exports = router;
