// collection.js
var mongoose = require('mongoose');  
var CollectionSchema = new mongoose.Schema({  
  pokemon_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

mongoose.model('Collection', CollectionSchema);

module.exports = mongoose.model('Collection');