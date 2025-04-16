// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // attach the full user object to req
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
