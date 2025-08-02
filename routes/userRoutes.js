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

// Routes protégées
router.get('/me', authenticateJWT, getCurrentUser); // Récupérer les informations de l'utilisateur connecté users/me
router.get('/managers', authenticateJWT, listManagers); // Récupérer la liste des managers users/managers

// Admin only
router.get('/', authenticateJWT, authorizeRole('Admin'), listUsers);//  /users
router.post('/', authenticateJWT, authorizeRole('Admin'), createUser); //  /users
router.put('/:id', authenticateJWT, authorizeRole('Admin'), updateUser);//  /users/:id
router.delete('/:id', authenticateJWT, authorizeRole('Admin'), deleteUser); //  /users/:id

module.exports = router;
