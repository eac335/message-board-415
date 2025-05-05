const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

// Create a new topic
router.post('/create', topicController.createTopic);

// Get all topics
router.get('/', topicController.getAllTopics);

// ✅ Get a specific topic by ID (moved under /view to avoid wildcard conflict)
router.get('/view/:id', topicController.getTopicById); // increments view count

module.exports = router;
