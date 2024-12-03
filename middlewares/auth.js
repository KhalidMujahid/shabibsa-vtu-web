const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);

    if (req.cookies.authToken) {
      res.clearCookie('authToken');
    }

    res.status(403).json({ message: 'Invalid or expired token. Please log in again.' });
  }
}

module.exports = { authenticateToken };

