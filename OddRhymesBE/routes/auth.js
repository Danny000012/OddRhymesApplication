const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token (e.g., JWT)
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
