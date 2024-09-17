const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from header
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;  // Attach user info to request
    next();
  });
};

module.exports = authenticate;
