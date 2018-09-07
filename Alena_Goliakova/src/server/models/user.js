const mongoose = require ('mongoose');

const pokemonSchema = new mongoose.Schema ({
  email: {type: String, unique: true},
  password: String,
  capturedPokemons: [],
});

module.exports = mongoose.model ('User', pokemonSchema);
