const Recipe = require('../models/recipe.model');
const Ingredient = require('../models/ingredient.model');
const _ = require('lodash');
const formidable = require('formidable');
// import fs from 'fs';

const create = (req, res) => {
  
  //===================
  //ПЛОХОЙ ВАРИАНТ
  //===================

  const ingredients = req.body.ingredient;

  for (let i = 0; i <= ingredients.length; i++){
    let ingredient = new Ingredient({name: ingredients[i]});
    if (Ingredient.find({name: `${ingredient[i]}`})) continue;
    ingredient.save();
  }

  recipe = new Recipe(req.body);

  recipe.save((err,doc)=>{
      if(err) return res.json({success:false,err});
      res.status(200).json({
          success: true,
          article: doc
      })
  })

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
}

const listRecipes = (req, res) => {

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
}

const recipeById = (req, res) => {
  let id =  req.query.id;
  Recipe.findById(id).exec((err, articlesById) => {
    if (err || !id)
      return res.status('400').json({
        error: "Recipe not found"
      });
      return res.status(200).send(articlesById)
  })
}

module.exports = {
  create,
  listRecipes,
  recipeById
}