'use strict';

require('dotenv').config({path: '../.env'});

const
  mongoose = require('mongoose'),
  url = require('../config/db').url,
  options = require('../config/db').options,
  Pokemon = require('../app/models/pokemon'),
  data = require('../pokemons.json');

const openConnection = () => new Promise(resolve => {
  mongoose.connect(url, options)
    .then(() => {
      console.log('connected to database');
      resolve();
    })
    .catch((err) => {
      console.log(err);
    });
});

const removePokemons = () => new Promise(resolve => {
  Pokemon.remove({})
    .then(() => {
      console.log('all existing pokemons removed');
      resolve();
    })
    .catch((err) => {
      console.log(err);
    });
});

const createPokemons = () => new Promise(resolve => {
  let pokemons = [];
  data.pokemons.map(item => {
    const pokemon = new Pokemon({
      name: item.name,
      id: item.id
    });
    pokemons.push(pokemon);
  });
  Pokemon.collection.insert(pokemons)
    .then(() => {
        console.log('pokemons loaded');
        resolve();
      })
    .catch((err) => {
      console.log(err);
    });
});

const closeConnection = () => new Promise(resolve => {
  mongoose.disconnect();
  console.log('connection close');
  resolve();
});

Promise.resolve()
  .then(openConnection)
  .then(removePokemons)
  .then(createPokemons)
  .then(closeConnection);