const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/user');
const checkToken = require('../utils/auth');

// RETURN ALL USERS
router.get('/users', checkToken, (req, res) => {
  User.find({}, { password: 0 }, (err, users) => {
    if (err) { 
      return res.status(500).send("There was a problem with finding the users");
    }
    res.status(200).send(users);
  });
});

// GET USER
router.get('/user/:id', checkToken, (req, res) => {
  User.findById(req.params.id, { password: 0 }, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem with finding the user");
    }
    if (!user) {
      return res.status(404).send("No user found");
    } 
    res.status(200).send(user);
  });
});

// DELETE USER
router.delete('/user/:id', checkToken, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem with deleting the user");
    } 
    res.status(200).send(`User: ${user.name} was deleted`);
  });
});

// CATCH POKEMON
router.put('/catch/:id', checkToken, (req, res) => {
  const pokemonId = req.query.pokemonId;
  User.findByIdAndUpdate(req.params.id, { $push: { pokemons: pokemonId } }, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem with finding the user");
    }
    if (!user) {
      return res.status(404).send("No user found");
    }
    User.findById(user._id, (err, user) => {
      res.status(200).send(user.pokemons);
    })
  });
});

module.exports = router;