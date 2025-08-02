const express = require('express');
const router = express.Router();
const {
  getAssessmentForReview,
  submitManagerReview
} = require('../controllers/managerAssessmentController');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

// Seuls les managers connectés peuvent accéder à ces routes
router.get('/:selfAssessmentId', authenticateJWT, authorizeRole('Manager'), getAssessmentForReview);
router.post('/', authenticateJWT, authorizeRole('Manager'), submitManagerReview);

module.exports = router;
