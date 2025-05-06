const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // Use process.env.JWT_SECRET in real deployment

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId; // Attach userId for later use
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyToken;
