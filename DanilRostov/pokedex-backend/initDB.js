"use strict"
const mongoose = require('mongoose');
const initData = require('../pokemons.json');
const db = require('./config/keys').mongoURI;

const pokemonsListSchema = new mongoose.Schema({ name: String, id: Number });
const pokemonsCollectionName = Object.keys(initData)[0];
const PokemonsList = mongoose.model(pokemonsCollectionName, pokemonsListSchema);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .then(() => {
    mongoose.connection.dropDatabase()
    console.log('MongoDB cleared...');
  })
  .then(() => {
    PokemonsList.insertMany(initData.pokemons)
      .then(() => {
        console.log('Init data loaded into MongoDB successfully!');
        process.exit(0);
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));