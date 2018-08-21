'use strict';

require('dotenv').config({path: '../.env'});

const
  mongoose = require('mongoose'),
  url = require('../config/db').url,
  options = require('../config/db').options,
  Pokemon = require('../app/models/pokemon'),
  data = require('../pokemons.json');

const openConnection = () => (
  mongoose.connect(url, options)
    .then(() => {
      console.log('connected to database');
    })
);

const removePokemons = () => (
  Pokemon.remove({})
    .then(() => {
      console.log('all existing pokemons removed');
    })
);

const createPokemons = () => {
  let pokemons = [];
  data.pokemons.map(item => {
    const pokemon = new Pokemon({
      name: item.name,
      id: item.id
    });
    pokemons.push(pokemon);
  });
  return Pokemon.collection.insert(pokemons)
    .then(() => {
        console.log('pokemons loaded');
      })
};

const closeConnection = () => (
  mongoose.disconnect()
    .then(() => {
      console.log('connection close');
    })
);

Promise.resolve()
  .then(openConnection)
  .then(removePokemons)
  .then(createPokemons)
  .then(closeConnection)
  .catch((err) => {
    console.log(err);
  });