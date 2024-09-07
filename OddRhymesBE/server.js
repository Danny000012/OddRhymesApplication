require('dotenv').config({ path: './oddRhymes.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB_URI:', MONGODB_URI);
console.log('PORT:', PORT);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');  // Import authentication routes
const rappostsRoutes = require('./routes/rapposts');  // Import rap posts routes

app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/rapposts', rappostsRoutes);  // Rap posts routes

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
