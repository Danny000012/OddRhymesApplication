const mongoose = require('mongoose');

const RapPostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  comments: [{
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RapPost', RapPostSchema);
