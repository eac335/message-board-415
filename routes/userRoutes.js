const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users/create
router.post('/create', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ POST /users/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
