const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new', { 
        currentUser: req.session.currentUser 
      })
    }
}
  
module.exports = isAuthenticated