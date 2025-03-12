  const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Full Authorization Header:', authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
