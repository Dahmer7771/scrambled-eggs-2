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
  next();
});

app.use(express.static('client/build'))
const PORT = process.env.PORT || 3000;

//Модели данных
const {Recipe} = require('./models/recipe');
const {Ingredient} = require('./models/ingredient');

//======================
//RECIPE API
//======================

//POST RECIPE

//Работа с картинками

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

/**
 * @api {post} /api/recipe/create Создает новый рецепт
 * @apiName CreateRecipe
 * @apiGroup Recipe
 *
 * @apiParam {String} name Обязательное название рецепта.
 * @apiParam {String} description Обязательное описание рецепта.
 * @apiParam {String} steps Обязательнае инструкция приготовления рецепта.
 * @apiParam {String} [category] Категория рецепта.
 * @apiParam {Array} [ingredient] Ингредиенты рецепта.
 * @apiParam {String} [mark] Тег рецепта.
 * 
 * @apiError Error Сообщение о типе ошибки
 */

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

/**
 * @api {get} /api/recipes/articles_number Запрос на получение кол-ва рецептов в базе
 * @apiName GetNumber
 * @apiGroup Recipe
 *
 * @apiSuccess {Number} number Количество рецептов в базе
 */

app.get('/api/recipes/articles_number', (req, res) => {
  Recipe.countDocuments({}, (err, c) => {return res.json(c)});
})


//GET RECIPES
// /articles?sortBy=created&order=desc&limit=100&skip=4

/**
 * @api {get} /api/recipes/articles Запрос на получение рецептов
 * @apiName GetRecipes
 * @apiGroup Recipes
 *
 * @apiParam {String} sortBy Поле для сортировки.
 * @apiParam {String} order Сортировка по убыванию или возрастанию.
 * @apiParam {Number} limit Сколько нужно получить рецептов.
 * @apiParam {Number} skip Сколько нужно пропустить рецептов от начала.
 *
 * @apiSuccess {json} articles Рецепты в формате json.
 */

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
/// /api/product/article?id=3242423423

/**
 * @api {get} /api/recipes/article_by_id Получить рецепт по id
 * @apiName GetRecipe
 * @apiGroup Recipe
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {json} recipe Рецепт в формате json.
 */

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

/**
 * @api {get} /api/recipes/article_by_ingredients Получить рецепт по ингредиентам
 * @apiName GetRecipeByIngredients
 * @apiGroup Recipe
 *
 * @apiParam {Array} ingredients Массиф ингредиентов для поиска.
 *
 * @apiSuccess {json} recipe Рецепт в формате json.
 */

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

/**
 * @api {get} /api/recipes/ingredients Получить ингредиенты рецептов
 * @apiName GetIngredients
 * @apiGroup Recipe
 *
 * @apiSuccess {json} ingredients Ингредиенты в формате json.
 */

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