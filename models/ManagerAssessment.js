const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  question: { type: String, required: true },
  score: { type: Number, required: true },
  comments: { type: String, default: '' }
});

const managerAssessmentSchema = new mongoose.Schema({
  selfAssessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SelfAssessment',
    required: true,
    unique: true, 
    index: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratings: {
    type: [ratingSchema],
    default: []
  },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('ManagerAssessment', managerAssessmentSchema);
