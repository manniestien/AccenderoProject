const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new mongoose.Schema({
  id: {type: String, required: false},
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  imageUrl: {type: String},

});

module.exports = mongoose.model('User', schema);
