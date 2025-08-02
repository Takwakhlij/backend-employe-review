const mongoose = require('mongoose');

const selfAssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  cycle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReviewCycle',
    required: true,
    index: true
  },
  goals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }],
  completedAt: {
    type: Date // rempli uniquement quand l’évaluation est soumise
  }
}, { timestamps: true });

// Contrainte : un seul selfAssessment par user & cycle
selfAssessmentSchema.index({ user: 1, cycle: 1 }, { unique: true });

module.exports = mongoose.model('SelfAssessment', selfAssessmentSchema);
