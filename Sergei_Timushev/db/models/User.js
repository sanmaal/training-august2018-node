const mongoose = require('mongoose');
const User = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  catchList: {
    type: Array,
  }
})

module.exports = mongoose.model('User', User); 