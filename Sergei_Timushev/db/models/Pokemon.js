const mongoose = require('mongoose');
const Pokemon = mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: Number,
  }
});

module.exports = mongoose.model('Pokemon', Pokemon); 