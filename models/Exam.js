const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true, 
    minlength: [1, 'Exam name must be a non-empty string.'],
  },
  planId: {
    type: Number,
    required: true,
    min: [1, 'Plan ID must be a positive number.'],
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number.'],
  },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
