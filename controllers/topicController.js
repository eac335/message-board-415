const Topic = require('../models/Topic');
const Subscription = require('../models/Subscription');

// Create new topic and auto-subscribe user
exports.createTopic = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const topic = new Topic({ name, creatorId: userId });
    await topic.save();

    // Auto-subscribe creator
    const sub = new Subscription({ userId, topicId: topic._id });
    await sub.save();

    res.status(201).json({ message: 'Topic created and subscribed', topic });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all topics with access count
exports.getAllTopics = async (req, res) => {
  const topics = await Topic.find().select('name accessCount');
  res.json(topics);
};

// Get one topic, increment access count
exports.getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    topic.accessCount += 1;
    await topic.save();

    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
