const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Create a new topic
router.post('/create', topicController.createTopic);

// Get all topics
router.get('/', topicController.getAllTopics);

// Get a specific topic by ID
router.get('/view/:id', topicController.getTopicById); // also increments view count

module.exports = router;
