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

  console.log(req.body);
  Recipe.find({name: req.body.recipe}, function (err, docs) {
    if (docs.length)
      return res.status(400).json("Recipe already exist")
  });
  
  let recipe;
  let ingredientReq = req.body.ingredient.split(',');
  // console.log(ingredientReq);
  if(req.file){
    recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    steps: req.body.steps,
    category: req.body.category,
    ingredient: ingredientReq,
    mark: req.body.mark,
    createdBy: req.body.createdBy, 
    image: req.file.path
  });}
  else {
    recipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      steps: req.body.steps,
      category: req.body.category,
      ingredient: ingredientReq,
      mark: req.body.mark,
      createdBy: req.body.createdBy, 
    });
  }

  recipe
    .save()
    .then( () => {
      let ingredients = ingredientReq;
  
      for (let i = 0; i < ingredients.length; i++){
        let ingredient = new Ingredient({name: ingredients[i], recipe: recipe._id})

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
    .then(result => {
      res.status(201).json('created');
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
    }); 
})

//GET NUMBER RECIPES

app.get('/api/recipes/articles_number', (req, res) => {
  Recipe.countDocuments({}, (err, c) => {return res.json(c)});
})


//GET RECIPES
// /articles?sortBy=created&order=desc&limit=100

app.get('/api/recipes/articles', (req, res) => {

  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let skip = parseInt(req.query.skip);

  Recipe.
  find().
  sort([[sortBy,order]]).
  skip(skip).
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

//GET RECIPE BY INGREDIENTS
app.get('/api/recipes/article_by_ingredients', (req,res) => {
  
  let ingredients = req.body.ingredients;
  Recipe.find({"ingredient": {$all: ingredients}}).exec((err, articlesIngredients) => {
    if (err)
      return res.status('400').json({
        error: "Recipes not found"
      });
      return res.status(200).send(articlesIngredients)
  })
})

//GET INGREDIENTS
app.get('/api/recipes/ingredients', (req, res) => {

  Ingredient.
  find().
  exec((err,ingr)=>{
    if(err) return res.status(400).send(err);
    res.send(ingr);
  })
})

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