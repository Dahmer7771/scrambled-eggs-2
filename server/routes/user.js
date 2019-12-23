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
  console.log(req.body);
  User.findOne({'email':req.body.email},(err,user)=>{
      if(!user) return res.json({loginSuccess:false,message:'Auth failed, email not found'});

      user.comparePassword(req.body.password,(err,isMatch)=>{
          if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password'});

          user.generateToken((err,user)=>{
              if(err) return res.status(400).send(err);
              res.cookie('w_auth',user.token, {httpOnly : false}).status(200).json({
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

//AUTH USER 

router.get('/api/users/auth',auth,(req,res)=>{
  res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
  })
})

//UPDATE USER

router.post('/api/users/update_profile',auth,(req,res)=>{

  User.findOneAndUpdate(
      { _id: req.user._id },
      {
          "$set": req.body
      },
      { new: true, useFindAndModify: false },
      (err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).send({
              success:true
          })
      }
  );
});

//RESET USER PASSWORD

router.post('/api/users/reset_user',(req,res)=>{
  User.findOne(
      {'email':req.body.email},
      (err,user)=>{
          user.generateResetToken((err,user)=>{
              if(err) return res.json({success:false,err});
              sendEmail(user.email,user.name,null,"reset_password",user)
              return res.json({success:true})
          })
      }
  )
})


router.post('/api/users/reset_password',(req,res)=>{

  var today = moment().startOf('day').valueOf();

  User.findOne({
      resetToken: req.body.resetToken,
      resetTokenExp:{
          $gte: today
      }
  },(err,user)=>{
      if(!user) return res.json({success:false,message:'Sorry, token bad, generate a new one.'})
  
      user.password = req.body.password;
      user.resetToken = '';
      user.resetTokenExp= '';

      user.save((err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).json({
              success: true
          })
      })
  })
})

module.exports = router;