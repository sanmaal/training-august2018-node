const
  mongoose = require('mongoose'),
  async = require('async'),
  url = require('../config/db').url,
  options = require('../config/db').options,
  Pokemon = require('../app/models/pokemon'),
  data = require('../pokemons.json');

const openConnection = (cb) => {
  mongoose.connect(url, options)
    .then(() => {
      console.log('connected to database');
      cb()
    });
};

const createPokemons = (cb) => {
  let count = 0;
  data.pokemons.map((item) => {
    const pokemon = new Pokemon({
      name: item.name,
      id: item.id
    });
    pokemon.save((err) => {
      if (err) { console.log(err) }
      count++;
      if (count === data.pokemons.length) {
        console.log('pokemons loaded');
        cb();
      }
    });
  });
};

const closeConnection = () => {
  mongoose.disconnect();
  console.log('connection close')
};

async.series(
  [
    openConnection,
    createPokemons
  ],
  closeConnection
);