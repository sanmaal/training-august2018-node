const mongoose = require('mongoose');

const { uri } = require('./config');
const { pokemons } = require('./pokemons.json');
const { Pokemon } = require('./models/Pokemon');

const seed = () => {
    mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => Pokemon.deleteMany({}))
        .then(() => Pokemon.insertMany(pokemons))
        .then(() => mongoose.disconnect())
        .then(() => console.log('Success initialization of database!'))
        .catch((err) => {
               console.log(err);
            })
}

seed();