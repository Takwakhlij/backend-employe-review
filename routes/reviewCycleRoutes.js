const express = require('express');
const router = express.Router();
const { createCycle, listCycles, updateCycleStatus } = require('../controllers/reviewCycleController');
const { authorizeRole } = require('../middlewares/roleMiddleware');

// Routes protégées, Admin uniquement (sauf listCycles accessible à tous utilisateurs connectés)
router.post('/', authorizeRole('Admin'), createCycle);
router.get('/', listCycles);
router.put('/:id', authorizeRole('Admin'), updateCycleStatus);

module.exports = router;
