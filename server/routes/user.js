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

//LOGIN USER
router.post('/api/users/login',(req,res)=>{
  User.findOne({'email':req.body.email},(err,user)=>{
      if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});

      user.comparePassword(req.body.password,(err,isMatch)=>{
          if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

          user.generateToken((err,user)=>{
              if(err) return res.status(400).send(err);
              res.cookie('w_auth',user.token).status(200).json({
                  loginSuccess: true
              })
          })
      })
  })
})

//LOGOUT USER
router.get('/api/users/logout',auth,(req,res)=>{
  User.findOneAndUpdate(
      { _id:req.user._id },
      { token: '' },
      { useFindAndModify: false },
      (err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).send({
              success: true
          })
      }
  )
});

module.exports = router;