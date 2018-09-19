const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  catched: [new Schema({
    name: {
      type: String,
    },
    id: {
      type: Number,
    }
  })]
});

module.exports = mongoose.model('User', userSchema);