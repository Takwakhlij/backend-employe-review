const express = require('express');
const router = express.Router();
const {
  getOrCreateAssessment,
  bulkAddGoals,
  completeAssessment
} = require('../controllers/selfAssessmentController');
const { authenticateJWT } = require('../middlewares/authMiddleware'); 
router.get('/', authenticateJWT, getOrCreateAssessment);
router.post('/goals', authenticateJWT, bulkAddGoals);
router.post('/complete', authenticateJWT, completeAssessment);

module.exports = router;
