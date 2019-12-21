//Подключение зависимостей проекта
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const SHA1 = require("crypto-js/sha1"); 
const multer = require('multer');
const moment = require("moment");
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const async = require('async');
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');

const app = express();

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  res.header("X-Content-Security-Policy", "script-src 'self' https://apis.google.com");
  res.header("X-WebKit-CSP", "script-src 'self' https://apis.google.com");
  next();
});

app.use(express.static('client/build'))
const PORT = process.env.PORT || 3000;

app.use("", recipeRoutes);
app.use("", userRoutes);


//========================
//USERS
//========================

app.get('/', (req, res) => {
  res.status(200);
  res.send('<p>some html</p>');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})