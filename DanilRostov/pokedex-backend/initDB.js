"use strict"
const mongoose = require('mongoose');
const initData = require('../../pokemons.json');
const db = require('./config/keys').mongoURI;

const pokemonsListSchema = new mongoose.Schema({ name: String, id: Number });
const pokemonsCollectionName = Object.keys(initData)[0];
const PokemonsList = mongoose.model(pokemonsCollectionName, pokemonsListSchema);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...');
    return mongoose.connection.dropDatabase();
  })
  .then(() => {
    console.log('MongoDB cleared...');
    return PokemonsList.insertMany(initData.pokemons);
  })
  .then(() => {
    console.log('Init data loaded into MongoDB successfully!');
    mongoose.connection.close();
  });

  