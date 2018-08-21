// pokemonController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Pokemon = require('./Pokemon');

// CREATES A NEW POKEMON
router.post('/', function (req, res) {
    Pokemon.create({
            name : req.body.name,
            pok_id : req.body.pok_id
        }, 
        function (err, pokemon) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(pokemon);
        });
});

// RETURNS ALL THE POKEMONS IN THE DATABASE
router.get('/', function (req, res) {
    Pokemon.find({}, function (err, pokemons) {
        if (err) return res.status(500).send("There was a problem finding the pokemon.");
        res.status(200).send(pokemons);
    });
});

// GETS A SINGLE POKEMON FROM THE DATABASE
router.get('/:id', function (req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
        if (err) return res.status(500).send("There was a problem finding the pokemon.");
        if (!pokemon) return res.status(404).send("No pokemon found.");
        res.status(200).send(pokemon);
    });
});

// DELETES A POKEMON FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Pokemon.findByIdAndRemove(req.params.id, function (err, pokemon) {
        if (err) return res.status(500).send("There was a problem deleting the pokemon.");
        res.status(200).send("Pokemon "+ pokemon.name +" was deleted.");
    });
});

// UPDATES A SINGLE POKEMON IN THE DATABASE
router.put('/:id', function (req, res) {
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, pokemon) {
        if (err) return res.status(500).send("There was a problem updating the pokemon.");
        res.status(200).send(pokemon);
    });
});

module.exports = router;