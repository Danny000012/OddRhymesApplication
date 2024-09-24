const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Adjust path as needed
const jwt = require('jsonwebtoken'); // Import jwt for token generation

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Use comparePassword method from User model
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    // Include the username in the response
    res.json({ token, username: user.username, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error); // Add detailed error logging
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
