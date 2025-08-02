const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  selfAssessment: {
    type: mongoose.Schema.Types.ObjectId, //Ce champ contient un id d’un autre document
    ref: 'SelfAssessment',
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
