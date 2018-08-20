const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon");
const jwt = require("jsonwebtoken");
const session = require("express-session");

router.get("/pokemons", function(req, res, next) {
  console.log("SESSION SESSION SESSION");
  let parameters = {};
  let limit = req.query.limit;
  let page = req.query.page;
  if (
    Object.keys(req.query).length &&
    limit == undefined &&
    page == undefined
  ) {
    parameters = req.query;
  } else if (limit != undefined && page != undefined) {
    Pokemon.find({}).then(pokemons => {
      let result = pokemons.filter(function(curr, index) {
        if (index >= limit * (page - 1) && index < limit * (page - 1) + limit) {
          console.log(curr);
          return curr;
        }
      });
      res.send(result);
      return res.end();
    });
  }

  Pokemon.find(parameters).then(pokemons => {
    res.send(pokemons);
  });
});

router.post("/pokemons", function(req, res, next) {
  let pokemon = new Pokemon(req.body);
  pokemon
    .save()
    .then(data => {
      res.send(pokemon);
    })
    .catch(next);
});

router.put("/pokemons/:id", function(req, res, next) {
  Pokemon.findOneAndUpdate({ id: req.params.id }, req.body).then(() => {
    Pokemon.findOne({ id: req.params.id }).then(pokemon => {
      res.send(pokemon);
    });
  });
});

router.delete("/pokemons/:id", function(req, res, next) {
  Pokemon.findOneAndRemove({ id: req.params.id }).then(pokemon => {
    res.send(pokemon);
  });
  res.send({ type: "DELETE" });
});

module.exports = router;
