// authController.js

const logoutUser = (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err); 
    }
    res.redirect('/profile'); 
  });
};

module.exports = {
  logoutUser
};
