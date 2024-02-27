require("dotenv").config()
const express = require('express')
const app = express()
require("./config/database")
const methodOverride = require('method-override')
const session = require('express-session')


/* IMPORT FRUIT ROUTES */
// old way: const fruitCtrl = require("./controllers/fruits")
// const fruitRoutes = require("./routes/fruits")
const userController = require("./controllers/userController.js")

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // more info: https://www.npmjs.com/package/express-session#resave
    })
)
app.use("/users", userController)
const sessionsController = require('./controllers/sessionsController.js')
app.use('/sessions', sessionsController)

  
// old way: app.use("/fruits", fruitCtrl)
// app.use("/fruits", fruitRoutes)

app.get("/", (req, res) => {
    res.render("home.ejs", { currentUser: req.session.currentUser, tabTitle: "Home" })
})

app.listen(3000, () => { console.log('The server is serving up fruit on 3000 🍎🍒🍊🍌')})