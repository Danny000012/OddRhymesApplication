const mongoose = require('mongoose');

const RapPostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  comments: [{
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
  }],
  ratingCount: { type: Number, default: 0 }, // to keep track of the number of ratings
  averageRating: { type: Number, default: 0 },
  isRatingFinal: { type: Boolean, default: false }, // to know if the rating is set from the first 5
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RapPost', RapPostSchema);