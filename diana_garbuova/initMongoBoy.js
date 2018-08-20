// const mongoose = require('mongoose');
// const { Pokemon } = require('./server/models/pokemon');
// const { pokemons } = require('../pokemons.json');
//
// const { DB_USER, DB_PWD, DB_NAME, DB_HOST, DB_PORT} = process.env;
//
// const connect = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
//
// try {
//   mongoose.connect(connect, { useNewUrlParser: true });
//   console.log(`Mongo boy is alive`);
//
//   Pokemon.collection.insertMany(pokemons);
//   console.log('Done!');
// } catch (e) {
//   console.log(e);
// }
//
