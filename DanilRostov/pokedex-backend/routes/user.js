"use strict"
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/user');
const checkToken = require('../utils/auth');

// RETURN ALL USERS
router.get('/users', checkToken, (req, res) => {
  User.find({}, { password: 0 })
   .then(users => {
      res.status(200).send(users);
    });
});

// GET USER
router.get('/user', checkToken, (req, res) => {
  User.findById(req.payload.id, { password: 0 })
    .then(user => {
      res.status(200).send(user);
    });
});

// DELETE USER
router.delete('/user', checkToken, (req, res) => {
  User.findByIdAndRemove(req.payload.id)
    .then(user => {
      res.status(200).send(`User: ${user.name} was deleted`);
    });
});

// CATCH POKEMON
router.put('/catch', checkToken, (req, res) => {
  const pokemonId = req.query.pokemonId;
  User.findByIdAndUpdate(req.payload.id, { $push: { pokemons: pokemonId } })
    .then(user => {
      User.findById(user._id)
        .then(user => {
          res.status(200).send(user.pokemons);
        })
    });
});

// GET CATCHED POKEMONS OF USER
router.get('/catched', checkToken, (req, res) => {
  User.findById(req.payload.id)
    .then(user => res.status(200).send(user.pokemons));
})

module.exports = router;