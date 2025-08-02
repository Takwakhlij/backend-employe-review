// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');
const { login2 } = require('../controllers/loginOAuthController'); 
const { logoutUser } = require('../controllers/logout');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/login2', login2);

router.get('/logout', logoutUser);
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.send(`Hello ${req.user.displayName}, welcome to your profile!`);
});
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile'); 
  }
);





module.exports = router;
