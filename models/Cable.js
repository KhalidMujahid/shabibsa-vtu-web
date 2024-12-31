const mongoose = require('mongoose');

const cableSchema = new mongoose.Schema({
  cable: {
    type: String,
    required: true, 
    trim: true,
  },
  iuc: {
    type: String,
    required: true, 
    trim: true,
  },
  cable_plan: {
    type: String,
    required: true, 
    trim: true, 
  },
}, { timestamps: true }); 

const Cable = mongoose.model('Cable', cableSchema);

module.exports = Cable;
