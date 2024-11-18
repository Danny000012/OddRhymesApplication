const jwt = require('jsonwebtoken');

// authenticate.js
const authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];  // Split 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Log the token for debugging purposes
  console.log('Received Token:', token);

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT verification failed:', err.message);  // Log the error details
      return res.status(403).json({ message: 'Failed to authenticate token', error: err.message });
    }

    // Attach user data to the request object
    req.user = { id: decoded.id, username: decoded.username };

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = authenticate;
