const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your-secret-key'; // 🔐 Replace with environment variable in production

// POST /users/create
router.post('/create', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    console.log(`✅ New user registered: ${user.username}`);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 🔐 Create JWT with user ID
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // 🍪 Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // ✅ Log that the cookie was registered
    console.log(`✅ Cookie set for user: ${user.username}`);

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
