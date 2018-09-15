const mongoose = require('mongoose');
const Pokemon = require('./server/models/pokemon');
const { getConnect } = require('./server/config');
const { pokemons } = require('../pokemons.json');

mongoose.connect(getConnect(), { useNewUrlParser: true })
  .then(() => console.log('Mongo boy is alive'))
  .then(() => {
    mongoose.connection.dropDatabase();
    console.log('Feeeeeed me!');
  })
  .then(() => {
    Pokemon.collection.insertMany(pokemons)
      .then(() => {
        console.log('Yami!');
        mongoose.connection.close();
      })
      .catch((error) => console.log(error))
  })
  .catch((e) => console.log(e));
