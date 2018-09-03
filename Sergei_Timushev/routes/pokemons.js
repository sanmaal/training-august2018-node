const express = require('express');
const api = require('../api.js');
const router = express.Router();

const mainPokemons = function (req, res) {
  const perPage = 10;
  let page = req.params.page || 1;
  api.getPokemons (perPage, page)
      .then ((result) => {
        res.json(result);
      })
}

router.get ('/', (req, res, next) => {
  mainPokemons(req, res)
});

router.get ('/:page', (req, res, next) => {
  mainPokemons(req, res)
});

router.get ('/pokemon/:id', (req, res, next) => {
  let id = req.params.id || 1;
  api.showPokemon (id)
      .then ((result) => {
        res.send(result);
      })
});

router.post ('/', (req, res, next) => {
  api.searchByNamePokemon (req.body)
      .then ((result) => {
        res.json(result);
      })
});

router.put ('/catch/:id', (req, res, next) => {
  if (req.session.user) {
    const userId = req.session.user.id;
    const pokemonId = req.params.id;      
    api.catchPokemon (userId, pokemonId)
        .then (() => {
          res.status(200).send(pokemonId);
        })
  } else {
    return res.status(500).send("Please signin");
  }  
});

router.get ('/caught/:page', (req, res, next) => {  
  if (req.session.user) {
    const perPage = 10;
    let page = req.params.page || 1;
    const userId = req.session.user.id;
  
    api.getCatchedPokemons (userId, perPage, page)
        .then ((result) => {
          res.send(result);
        })
  } else {
    return res.status(500).send("Please signin");
  }
});

module.exports = router;