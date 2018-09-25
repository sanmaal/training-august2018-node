const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  id: {
    type: Number,
    required: [true, "ID field is required"]
  },
  caught: {
    type: Boolean,
    required: false
  },
  caughtDate:{
	  type: String
  }
});


const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;