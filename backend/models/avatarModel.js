const mongoose = require('mongoose');

const avatarSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'You must declare a category'],
    enum: {
      values: ['Bronze', 'Silver', 'Gold', 'Legendary'],
      message: 'Category is either: Bronze, Silver, Gold or Legendary',
    },
  },
  availability: {
    type: String,
    default: 'paid',
    enum: {
      values: ['paid', 'free'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
  },
  name: {
    type: String,
    required: [true, 'You must declare the nema of the avatar'],
  },
  url: {
    type: String,
    required: [true, 'Avatars must have a url'],
  },
  price: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Avatars = mongoose.model('Avatars', avatarSchema);

module.exports = Avatars;
