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
const cors = require('cors')


const app = express();

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Credentials', true);
  next();
  // res.header("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  // res.header("X-Content-Security-Policy", "script-src 'self' https://apis.google.com");
  // res.header("X-WebKit-CSP", "script-src 'self' https://apis.google.com");
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../public')));



const PORT = process.env.PORT || 80;
const DNS = process.env.DNS || 'localhost';

app.use("", recipeRoutes);
app.use("", userRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, DNS, () => {
  console.log(`Server is running on port ${PORT} & dns ${DNS}`);
})