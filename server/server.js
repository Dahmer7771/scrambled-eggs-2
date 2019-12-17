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

const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('client/build'))
const PORT = process.env.PORT || 3000;

//Models
const {Recipe} = require('./models/recipe');
const {Ingredient} = require('./models/ingredient');

//======================
//RECIPE API
//======================

//POST RECIPE

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


app.post('/api/recipe/create', upload.single('image'), (req, res) => {

  //ПОПЫТКА 4

  // let recipe;

  // if(req.file){
  //   recipe = new Recipe({
  //   name: req.body.name,
  //   description: req.body.description,
  //   category: req.body.category,
  //   ingredient: req.body.ingredient,
  //   mark: req.body.mark,
  //   createdBy: req.body.createdBy, 
  //   image: req.file.path
  // });}
  // else {
  //   recipe = new Recipe(req.body);
  // }

  // recipe
  //   .save()
  //   .then(result => {
  //     res.status(201).json({
  //       message: "Created product successfully"
  //     });
  //   })
  //   .catch(err => {
  //   console.log(err);
  //   res.status(500).json({
  //     error: err
  //   });
  //   });

    // ПОПЫТКА 5
    let recipe;

    if(req.file){
      recipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      ingredient: req.body.ingredient,
      mark: req.body.mark,
      createdBy: req.body.createdBy, 
      image: req.file.path
    });}
    else {
      recipe = new Recipe(req.body);
    }

    recipe
      .save()
      .then( () => {
        let ingredients = req.body.ingredient;
    
        for (let i = 0; i < ingredients.length; i++){
          let ingredient = new Ingredient({name: ingredients[i], recipe: recipe._id})
          // console.log(ingredient);

          Ingredient.find({name: ingredients[i]}, function (err, docs) {
            if (docs.length){

              Ingredient.findOneAndUpdate({
                name: `${ingredients[i]}`}, 
                {$push: {recipe: recipe._id}}, 
                {new: true, useFindAndModify: false})
              .populate('recipe')
              .exec((err) => {
                if (err) {
                  return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                  })
                }
              })
            }
            else{
              ingredient.save();
            }
          });
        }
      })
      .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
      });
    
    // console.log(recipe._id)
    
    // let ingredients = req.body.ingredient;
    
    // for (let i = 0; i <= ingredients.length; i++){
    //   let ingredient = new Ingredient({name: ingredients[i]}, {recipe: recipe._id})
    //   console.log(ingredient);
    //   if (Ingredient.find({name: `${ingredient[i]}`})){
    //     Ingredient.findOneAndUpdate({
    //       name: `${ingredient[i]}`}, 
    //       {$push: {recipe: recipe._id}}, 
    //       {new: true, useFindAndModify: false})
    //     // .populate('recipe')
    //     .exec((err) => {
    //       if (err) {
    //         return res.status(400).json({
    //           error: errorHandler.getErrorMessage(err)
    //         })
    //       }
    //     })
    //   }
    //   else ingredient.save().populate('recipe');
    // }
  
  //ПЛОХОЙ ВАРИАНТ
  // const ingredients = req.body.ingredient;

  // for (let i = 0; i <= ingredients.length; i++){
  //   let ingredient = new Ingredient({name: ingredients[i]});
  //   if (Ingredient.find({name: `${ingredient[i]}`})) continue;
  //   ingredient.save();
  // }

  // recipe = new Recipe(req.body);

  // recipe.save((err,doc)=>{
  //     if(err) return res.json({success:false,err});
  //     res.status(200).json({
  //         success: true,
  //         article: doc
  //     })
  // })

  //ВТОРОЙ ВАРИАНТ
  
  // const recipe = new Recipe(req.body);

  // if (Recipe.find({name: `${recipe.name}`})) {
  //   //TODO
  // }
  // else {
  //   await recipe.save();  
  // }

  // let flag = true;
  // await Recipe.find({name: `${recipe.name}`}).then((data) => {
  //   console.log(data)
  //   if (data.toString === []) { 
  //     //TODO
  //     flag = false; 
  //   }
  //   else {
      
  //   }
  // })
  // console.log(flag);
  // if (flag) {
  //   await recipe.save();
  // }


  // let recipeData = {};

  // await Recipe.findOne({name: recipe.name}).then((data) => {
  //   // console.log(data);
  //   recipeData = data;
  //   console.log(recipeData);
  // });
  
  // let recipeID = recipeData._id;
  // console.log(recipeID);
  

  // for (let i = 0; i <= ingredients.length; i++){
  //   let ingredient = new Ingredient({name: ingredients[i]});
  //   if (Ingredient.find({name: `${ingredient[i]}`})) {
  //     Ingredient.findOneAndUpdate(ingredientn.name, {$push: {recipe: recipe.name}}, {new: true}).
  //     populate('recipe');
  //     continue;
  //   }
  //   else {
  //     ingredient.recipe = recipeID;
  //     ingredient.save();
  //   }
  // }
})

//GET RECIPES
// /articles?sortBy=created&order=desc&limit=100

app.get('/api/recipes/articles', (req, res) => {

  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Recipe.
  find().
  sort([[sortBy,order]]).
  limit(limit).
  exec((err,articles)=>{
    if(err) return res.status(400).send(err);
    res.send(articles);
  })
})

//GET RECIPE 

/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/recipes/article_by_id', (req,res) => {

  let id =  req.query.id;
  Recipe.findById(id).exec((err, articlesById) => {
    if (err || !id)
      return res.status('400').json({
        error: "Recipe not found"
      });
      return res.status(200).send(articlesById)
  })

});

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