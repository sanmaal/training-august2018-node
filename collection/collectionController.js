// collectionController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Collection = require('./Collection');

// ADD A CATCHED POKEMON
router.post('/', function (req, res) {
    Collection.create({
            pokemon_name : req.body.pokemon_name,
            user_name : req.body.user_name,
            user_id: req.body.user_id
        }, 
        function (err, collection) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(collection);
        });
});

// RETURNS ALL CATCHED POKEMON
router.get('/', function (req, res) {
    Collection.find({}, function (err, collections) {
        if (err) return res.status(500).send("There was a problem finding the pokemons.");
        res.status(200).send(collections);
    });
});

// GETS A SINGLE CATCHED POKEMON
router.get('/:id', function (req, res) {
    Collection.findById(req.params.id, function (err, collection) {
        if (err) return res.status(500).send("There was a problem finding the catched pokemons.");
        if (!collection) return res.status(404).send("No user found.");
        res.status(200).send(collection);
    });
});

// DELETES A CATCHED POKEMON FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Collection.findByIdAndRemove(req.params.id, function (err, collection) {
        if (err) return res.status(500).send("There was a problem deleting the catched pokemons.");
        res.status(200).send("Collection "+ collection.name +" was deleted.");
    });
});

// UPDATES A CATCHED POKEMON IN THE DATABASE
router.put('/:id', function (req, res) {
    Collection.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, collection) {
        if (err) return res.status(500).send("There was a problem updating the catched pokemon.");
        res.status(200).send(collection);
    });
});

module.exports = router;