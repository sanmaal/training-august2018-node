const pokemonsList = require ('../../db.json');
const mongoose = require ('mongoose');
const Pokemon = require ('../models/pokemon');

mongoose.connect ('mongodb://localhost/homeworkDB');
var db = mongoose.connection;

db.on ('error', console.error.bind (console, 'connection error:'));
db.once ('open', function () {
  // we're connected!
  console.log ('connected');
  db.dropCollection ('pokemons', (err, docs) => {
    console.log ('Pokemons deleted');
    Pokemon.insertMany (pokemonsList.pokemons, (err, docs) => {
      console.log ('Pokemons inserted!');
    });
  });
});
