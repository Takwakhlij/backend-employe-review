const passport = require('passport');

const login2 = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.login2 = login2;
