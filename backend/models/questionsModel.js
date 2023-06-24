const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'You must declare a category'],
    enum: {
      values: ['basketball', 'football'],
      message: 'Category is either: Basketball or Football',
    },
  },
  difficulty: {
    type: String,
    required: [true, 'Questions must have difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
  },
  content: {
    type: String,
    required: [true, 'Questions must have content'],
  },
  questionImage: {
    type: String,
  },
  answers: {
    type: [String],
    required: [true, 'Questions must have possible answers'],
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Questions must have a correct answer'],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;
