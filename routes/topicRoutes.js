const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');

router.post('/create', topicController.createTopic);
router.get('/', topicController.getAllTopics);
router.get('/:id', topicController.getTopicById); // increments view count

module.exports = router;
