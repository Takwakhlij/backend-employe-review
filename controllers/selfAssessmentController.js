const SelfAssessment = require('../models/SelfAssessment');
const Goal = require('../models/Goal');

const getOrCreateAssessment = async (req, res) => {
  try {
    let assessment = await SelfAssessment.findOne({ user: req.user.id, cycle: req.query.cycle });
    if (!assessment) {
      assessment = await SelfAssessment.create({ user: req.user.id, cycle: req.query.cycle });
    }
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bulkAddGoals = async (req, res) => {
  try {
    const { selfAssessmentId, goals } = req.body;
    const createdGoals = await Goal.insertmany(goals.map(desc => ({
      description: desc,
      selfAssessment: selfAssessmentId
    })));
    res.status(201).json(createdGoals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const completeAssessment = async (req, res) => {
  try {
    const { selfAssessmentId } = req.body;
    const updated = await SelfAssessment.findByIdAndUpdate(
      selfAssessmentId,
      { completedAt: new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getOrCreateAssessment, bulkAddGoals, completeAssessment };
