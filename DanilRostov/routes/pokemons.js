const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');
const generateIds = require('../utils/routeUtils');

router.get('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const ids = generateIds(req.query._start, req.query._limit);
  Pokemon.find({ id: { $in: ids } })
    .then((pokemonsList) => res.send(pokemonsList))
});

module.exports = router;