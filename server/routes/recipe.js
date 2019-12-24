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
const csp = require('content-security-policy');
const router = express.Router();

//Модели данных
const {Recipe} = require('../models/recipe');
const {Ingredient} = require('../models/ingredient');
const {User} = require('../models/user');

// Middlewares
const { auth } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

//======================
//RECIPE API
//======================

//POST RECIPE

//Работа с картинками

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
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

router.post('/api/recipe/create', upload.single('image'), /*auth,*/ (req, res) => {

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
    // createdBy: req.user._id, 
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
      // createdBy: req.name._id, 
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

//UPDATE RECIPE

router.put("/api/recipes/article_by_id", upload.single('image'), /*auth,*/ (req, res) => {
  
  let id =  req.query.id;
  let recipe;
  let ingredientReq = req.body.ingredient.split(',');
  // console.log(ingredientReq);
  if(req.file){
    recipe = {
    name: req.body.name,
    description: req.body.description,
    steps: req.body.steps,
    category: req.body.category,
    ingredient: ingredientReq,
    mark: req.body.mark,
    image: req.file.path,
    updated: Date.now()
  };}
  else {
    recipe = {
      name: req.body.name,
      description: req.body.description,
      steps: req.body.steps,
      category: req.body.category,
      ingredient: ingredientReq,
      mark: req.body.mark,
      updated: Date.now(), 
    };
  }

  Recipe.findByIdAndUpdate({ _id: id }, {"$set": recipe}, { useFindAndModify: false })
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
    res.status(201).json('updated');
  })
  .catch(err => {
  console.log(err);
  res.status(500).json({
    error: err
  });
  }); 

})

// REMOVE RECIPE

router.delete("/api/recipes/article_by_id", /*auth,*/ (req, res) => {
  
  let id =  req.query.id;
  // let createdBy = req.user._id;
  // let canBeDeleted = false;
  let canBeDeleted = true;

  Recipe.findById(id).exec((err, result) => {
    if(err) return res.status(400).send(err);
    // if (createdBy.toString() == result.createdBy.toString() || req.user.role == 1) canBeDeleted = true;
    if(canBeDeleted){
      Recipe.deleteOne({ _id: `${id}`}, (err, deletedProduct) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
        res.json(deletedProduct)
      })
    }
    else{
      return res.json(`It's not your reсipe`)
    }
  })
})


//GET NUMBER RECIPES

/**
 * @api {get} /api/recipes/articles_number Запрос на получение кол-ва рецептов в базе
 * @apiName GetNumber
 * @apiGroup Recipe
 *
 * @apiSuccess {Number} number Количество рецептов в базе
 */

router.get('/api/recipes/articles_number', (req, res) => {
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

router.get('/api/recipes/articles', (req, res) => {

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

router.get('/api/recipes/article_by_id', (req,res) => {

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
 * @api {post} /api/recipes/article_by_ingredients Получить рецепт по ингредиентам
 * @apiName GetRecipeByIngredients
 * @apiGroup Recipe
 *
 * @apiParam {Array} ingredients Массиф ингредиентов для поиска.
 *
 * @apiSuccess {json} recipe Рецепт в формате json.
 */

router.post('/api/recipes/article_by_ingredients', (req,res) => {
  
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
router.get('/api/recipes/ingredients', (req, res) => {

  Ingredient.
  find().
  exec((err,ingr)=>{
    if(err) return res.status(400).send(err);
    res.send(ingr);
  })
})

module.exports = router;