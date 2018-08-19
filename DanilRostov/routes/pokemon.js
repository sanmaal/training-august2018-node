const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/:id', (req, res) => {
  const pokemonId = req.params.id;
  Pokemon.find({ id: pokemonId })
    .then((pokemon) => res.send(pokemon))
});

module.exports = router;