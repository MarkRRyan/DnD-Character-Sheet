require('dotenv').config();
require('./config/database');
const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userController);
app.use(
    session({
      secret: process.env.SECRET,
      resave: false, 
      saveUninitialized: false
    })
)
  

app.get('/', (req, res) => {
  res.render('home.ejs');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})