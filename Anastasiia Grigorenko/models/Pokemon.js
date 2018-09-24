const mongoose = require('mongoose');
const Joi = require('joi');

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
});

function validatePokemon(pokemon){
    const schema ={
        name: Joi.string().required(),
        id: Joi.number().integer().required()
    };

    return Joi.validate(pokemon, schema);
}
exports.Pokemon = mongoose.model('Pokemon', pokemonSchema);
exports.validatePokemon = validatePokemon;