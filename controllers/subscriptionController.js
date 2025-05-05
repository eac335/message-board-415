const Subscription = require('../models/Subscription');
const Topic = require('../models/Topic');

// Subscribe user to a topic
exports.subscribe = async (req, res) => {
  try {
    const { userId, topicId } = req.body;

    // Prevent duplicate subscriptions
    const existing = await Subscription.findOne({ userId, topicId });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });

    const sub = new Subscription({ userId, topicId });
    await sub.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unsubscribe user from a topic
exports.unsubscribe = async (req, res) => {
  try {
    const { userId, topicId } = req.body;
    await Subscription.findOneAndDelete({ userId, topicId });
    res.json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all topics the user is NOT subscribed to
exports.getAvailableTopics = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscribed = await Subscription.find({ userId }).select('topicId');
    const subscribedIds = subscribed.map((s) => s.topicId);

    const topics = await Topic.find({ _id: { $nin: subscribedIds } });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List all topics the user IS subscribed to
exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;

    const subs = await Subscription.find({ userId }).populate('topicId');
    res.json(subs.map(s => s.topicId)); // return topic data only
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
