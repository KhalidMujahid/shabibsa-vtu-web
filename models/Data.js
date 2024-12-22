const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planId: {
    type: Number,
    required: true,
    min: [1, 'Plan ID must be a positive number.'], 
  },
  network: {
    type: Number,
    required: true,
    min: [1, 'Network must be a positive number.'],
  },
  planType: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Plan type must be a non-empty string.'],
  },
  planName: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Plan name must be a non-empty string.'],
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number.'],
  }
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
