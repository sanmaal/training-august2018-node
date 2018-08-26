const mongoose = require('mongoose');
const { uri } = require('./config');

const { Pokemon } = require('./models/Pokemon.js');
const { pokemons } = require('./pokemons.json');

const seed = () => {
	mongoose.connect(config.uri, { useNewUrlParser: true })
		.then(() => Pokemon.deleteMany({}))
		.then(() => Pokemon.insertMany(pokemons))
		.then(() => mongoose.disconnect())
		.then(() => console.log('( ͡° ͜◯ ͡°)'))
		.catch((err) => {
				// handle errors
		})
}

seed();