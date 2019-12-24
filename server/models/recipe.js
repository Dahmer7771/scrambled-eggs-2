const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  steps: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  ingredient: {
    type: Array
  }, 
  mark: [{
    type: Schema.Types.ObjectId,
    ref: 'Mark'
  }],
  like: {
    type: Number
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String, 
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = { Recipe }

