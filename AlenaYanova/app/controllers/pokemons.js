'use strict';

const
  Pokemon = require('../models/pokemon'),
  url_parse = require('url').parse;

exports.getPokemonById = (req, res, next) => {
  const details = { 'id': req.params.id };
  Pokemon.findOne(details)
    .select({ 'catchInfo.userId': 0, '_id': 0, '__v': 0 })
    .then(pokemon =>
      res.status(200).send(pokemon))
    .catch(err => next(err))
};

exports.pagination = (req, res, next) => {
  const
    query = url_parse(req.url, true).query,
    perPage = query.perPage? +query.perPage: 10,
    page = Math.max(0, req.params.page);
  Pokemon.find(req.details)
    .skip(perPage * (page - 1))
    .limit(perPage)
    .sort('id')
    .select({ 'catchInfo.userId': 0, '_id': 0, '__v': 0 })
    .exec((err, pokemons) => {
      if (err) {
        return next(err);
      } else {
      Pokemon.countDocuments(req.details).exec((err, count) =>{
        if (err) {
          return next(err);
        }
        res.status(200).json({
          pokemons: pokemons,
          page: page,
          pages: count / perPage
        })
      })}
    });
};

exports.setPokemonsQuery = (req, res, next) => {
  req.details = {};
  next();
};

exports.setCaughtPokemonsQuery = (req, res, next) => {
  req.details = {
    'catchInfo.isCaught': true,
    'catchInfo.userId': req.user._id
  };
  next();
};

exports.catchPokemon = (req, res, next) => {
  const details = { 'id': req.params.id };
  Pokemon.findOne(details)
    .then(pokemon => {
      if (pokemon.catchInfo.isCaught){
        res.status(200).json({ message: 'Sorry, pokemon is caught' })
      } else {
        pokemon.catch(req.user._id);
        res.status(201).send(pokemon);
      }
    })
    .catch(err => next(err))
};