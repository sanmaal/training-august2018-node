// app.js
var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

var PokemonController = require('./pokemon/pokemonController');
app.use('/pokemons', PokemonController);

var CollectionController = require('./collection/collectionController');
app.use('/collections', CollectionController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;