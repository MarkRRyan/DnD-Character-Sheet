require("dotenv").config()
const express = require('express')
const app = express()
require("./config/database")
const methodOverride = require('method-override')
const session = require('express-session')

// CONTROLLERS
const userController = require("./controllers/userController.js")
const sessionsController = require('./controllers/sessionsController.js')

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false
    })
)
app.use("/users", userController)
app.use('/sessions', sessionsController)

app.get("/", (req, res) => {
    res.render("home.ejs", { 
        currentUser: req.session.currentUser, 
        tabTitle: "Home" 
    })
})

app.listen(3000, () => { console.log(`Fighting a Dragon on port 3000!`)})