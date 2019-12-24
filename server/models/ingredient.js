const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  recipe: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }]
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = { Ingredient }
