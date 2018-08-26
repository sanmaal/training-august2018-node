const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
})
 
//todo
const validatePokemon = (pokemon) => {
	const schema = {
		name: Joi.string()
			.required(),
		id: Joi.number()
			.required(),
		date: Joi.date()
			.required(),
	}

	return Joi.validate(pokemon, schema);
}

exports.Pokemon = mongoose.model('Pokemon', pokemonSchema);
exports.validate = validatePokemon;