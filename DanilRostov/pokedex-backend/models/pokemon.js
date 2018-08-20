"use strict"
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  id: Number
});

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;