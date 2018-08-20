const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const pokemonSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  id: {
    type: Number,
  }
});

module.exports = mongoose.model('Pokemon', pokemonSchema);