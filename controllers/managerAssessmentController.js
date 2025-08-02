const ManagerAssessment = require('../models/ManagerAssessment');
const SelfAssessment = require('../models/SelfAssessment');
const Goal = require('../models/Goal');

const getAssessmentForReview = async (req, res) => {
  try {
    const { selfAssessmentId } = req.params;
    const selfAssessment = await SelfAssessment.findById(selfAssessmentId).populate('user');
    if (!selfAssessment) {
      return res.status(404).json({ message: "Self-assessment not found" });
    }
    const goals = await Goal.find({ selfAssessment: selfAssessmentId });
    res.json({ selfAssessment, goals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitManagerReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { selfAssessment, ratings } = req.body;
    if (!selfAssessment || !ratings) {
      return res.status(400).json({ message: "selfAssessment and ratings are required" });
    }
    const review = new ManagerAssessment({
      selfAssessment,
      manager: req.user.id,
      ratings,
      completedAt: new Date()
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAssessmentForReview, submitManagerReview };
