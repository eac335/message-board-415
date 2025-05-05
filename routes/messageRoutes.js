const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.post('/post', controller.postMessage);
router.get('/recent/:userId', controller.getRecentMessagesByUser);

module.exports = router;
