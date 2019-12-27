const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
})

const Category = mongoose.model('Category', categoriesSchema);
module.exports = { Category }