const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    // unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  caughtPokemons:{
	  type: Array
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
