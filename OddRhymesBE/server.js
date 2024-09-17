require('dotenv').config({ path: './oddRhymes.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const rappostsRoutes = require('./routes/rapposts');
const userRoutes = require('./routes/userRoutes');

app.use('/api/rapposts', rappostsRoutes);  // Rap posts routes
app.use('/api/users', userRoutes); // Authentication routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
