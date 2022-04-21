
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/auth/login')
  };


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/users')
  }
  next()
}

module.exports = {checkAuthenticated, checkNotAuthenticated}
