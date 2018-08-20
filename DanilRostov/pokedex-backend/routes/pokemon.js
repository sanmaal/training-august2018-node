"use strict"
const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');
const generateIds = require('../utils/pokemons');

// GET POKEMONS LIST BY QUERIES
router.get('/pokemons', (req, res) => {
  if (req.query._start && req.query._limit) {
    const ids = generateIds(req.query._start, req.query._limit);
    Pokemon.find({ id: { $in: ids } })
      .then((pokemonsList) => res.status(200).send(pokemonsList))
  } else {
    res.status(400).send('use _start and _limit queries or id');
  }
});

// GET POKEMON
router.get('/pokemon/:id', (req, res) => {
  if (req.params.id) {
    const pokemonId = req.params.id;
    Pokemon.find({ id: pokemonId })
      .then((pokemon) => res.status(200).send(pokemon))
  } else {
    res.status(400).send('use _start and _limit queries or id');
  }
});

module.exports = router;