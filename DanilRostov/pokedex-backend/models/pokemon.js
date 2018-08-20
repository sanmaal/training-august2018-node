"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  id: Number
});

module.exports = Pokemon = mongoose.model('pokemon', pokemonSchema);