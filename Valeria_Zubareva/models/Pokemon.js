const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    users: {
        type: Array
    }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);