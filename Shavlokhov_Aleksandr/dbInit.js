const mongoose = require('mongoose');
const defaultPokemons = require('./pokemons.json');

const pokemonsListSchema = new mongoose.Schema({ name: String, id: Number });
const pokemonsCollectionName = Object.keys(defaultPokemons)[0];
const PokemonsList = mongoose.model(pokemonsCollectionName, pokemonsListSchema);

mongoose
  .connect('mongodb://sasha:qwerty11@ds125472.mlab.com:25472/pokedex-db')
  .then(() => {
    console.log('MongoDB connected...');
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log('MongoDB cleared...');
    return PokemonsList.insertMany(defaultPokemons.pokemons);
  })
  .then(() => {
    console.log('Init data loaded into MongoDB successfully!');
    mongoose.connection.close();
  });