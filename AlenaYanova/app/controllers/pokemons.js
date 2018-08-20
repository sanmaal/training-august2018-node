const
  Pokemon = require('../models/pokemon'),
  url_parse = require('url').parse;

exports.getPokemonById = (req, res, next) => {
  const details = { 'id': req.params.id };
  Pokemon.findOne(details, (err, item) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).send(item);
    }
  });
};

exports.pagination = (req, res, next) => {
  const
    query = url_parse(req.url, true).query,
    perPage = query.perPage? +query.perPage: 10,
    page = Math.max(0, req.params.page);
  Pokemon.find(req.query_details)
    .skip(perPage * (page - 1))
    .limit(perPage)
    .sort('id')
    .exec((err, pokemons) => {
      if (err) {
        return next(err);
      } else {
      Pokemon.countDocuments(req.query_details).exec((err, count) =>{
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

exports.getPokemons = (req, res, next) => {
  req.query_details = {};
  next();
};

exports.getCaughtPokemons = (req, res, next) => {
  req.query_details = {
    'catchInfo.isCaught': true,
    'catchInfo.userId': req.user._id
  };
  next();
};

exports.catchPokemon = (req, res, next) => {
  const query_details = { 'id': req.params.id };
  Pokemon.findOne(query_details, (err, pokemon) => {
    if (err) {
      return next(err);
    } else {
      if (pokemon.catchInfo.isCaught){
        res.status(200).json({ message: 'Sorry, pokemon is caught' })
      } else {
        pokemon.catch(req.user._id);
        res.status(201).send(pokemon);
      }
    }
  });
};