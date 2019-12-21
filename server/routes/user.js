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
const csp = require('content-security-policy');
const router = express.Router();

//Models
const {Recipe} = require('../models/recipe');
const {User} = require('../models/user');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

//Utils
const {sendEmail} = require('../utils/mail/index');

//REGISTER USER

router.post('/api/users/register',(req,res)=>{
  const user = new User(req.body);

  user.save((err,doc)=>{
      if(err) return res.json({success:false,err});
      sendEmail(doc.email,doc.name,null,"welcome");
      return res.status(200).json({
          success: true
      })
  })
});

module.exports = router;