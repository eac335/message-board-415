const Message = require('../models/Message');
const Subscription = require('../models/Subscription');
const observer = require('../utils/observer'); // ✅ Import observer

// Post a message in a topic (only if subscribed)
exports.postMessage = async (req, res) => {
  try {
    const { topicId, userId, content } = req.body;

    const subscribed = await Subscription.findOne({ userId, topicId });
    if (!subscribed) {
      return res.status(403).json({ message: 'Not subscribed to this topic' });
    }

    const message = new Message({ topicId, userId, content });
    await message.save();

    // ✅ Observer pattern: emit event
    observer.emit('messagePosted', { topicId, userId, content });

    res.status(201).json({ message: 'Message posted', data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get last 2 messages in each topic the user is subscribed to
exports.getRecentMessagesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const subs = await Subscription.find({ userId }).select('topicId');
    const topicIds = subs.map(s => s.topicId);

    const results = [];

    for (const topicId of topicIds) {
      const messages = await Message.find({ topicId })
        .sort({ createdAt: -1 })
        .limit(2)
        .populate('userId', 'username');

      results.push({ topicId, messages });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
