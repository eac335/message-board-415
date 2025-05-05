const express = require('express');
const router = express.Router();
const controller = require('../controllers/subscriptionController');

router.post('/subscribe', controller.subscribe);
router.post('/unsubscribe', controller.unsubscribe);
router.get('/available/:userId', controller.getAvailableTopics);
router.get('/subscribed/:userId', controller.getUserSubscriptions);

module.exports = router;
