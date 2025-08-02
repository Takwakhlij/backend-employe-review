const mongoose = require('mongoose');

const reviewCycleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  }
}, { timestamps: true }); // ajoute createdAt et updatedAt

module.exports = mongoose.model('ReviewCycle', reviewCycleSchema);
