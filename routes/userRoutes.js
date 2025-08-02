const express = require('express');
const router = express.Router();
const {
  getCurrentUser,
  listManagers,
  listUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const { authenticateJWT } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');


router.get('/me', authenticateJWT, getCurrentUser); 
router.get('/managers', authenticateJWT, listManagers); 

// Admin only
router.get('/', authenticateJWT, authorizeRole('Admin'), listUsers);
router.post('/', authenticateJWT, authorizeRole('Admin'), createUser); 
router.put('/:id', authenticateJWT, authorizeRole('Admin'), updateUser);
router.delete('/:id', authenticateJWT, authorizeRole('Admin'), deleteUser); 

module.exports = router;
