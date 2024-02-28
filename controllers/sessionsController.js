const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/User.js')

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { 
        currentUser: req.session.currentUser,
        tabTitle: "Log In"
    })
})

// on sessions form submit (log in)
router.post('/', async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) {
        // if found user is undefined/null not found etc
        res.send('<a  href="/">Sorry, no user found </a>')
    
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
    } else {
        res.send('<a href="/"> password does not match </a>')
    }
  } catch(err) {
    console.log(err)
    res.send('oops the db had a problem')
  }
})

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = router
