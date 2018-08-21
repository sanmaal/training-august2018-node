// pokemon.js
var mongoose = require('mongoose');  
var PokemonSchema = new mongoose.Schema({  
  name: {
      type: String,
      required: true,
  },
  pok_id: {
      type: Number,
      required: true,
  }
});

mongoose.model('Pokemon', PokemonSchema);

module.exports = mongoose.model('Pokemon');