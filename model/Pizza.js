const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pizza = new Schema({
  flavor: {
    type: String
  },
  price: {
    type: Number
  },
  ingredients: {
    type: String
  },
  size: {
    type: String
  },
  available: {
    type: Boolean
  }
},{
    collection: 'pizza'
});

module.exports = mongoose.model('Pizza', Pizza);