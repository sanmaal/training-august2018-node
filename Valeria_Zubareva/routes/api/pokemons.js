const express = require('express');
const router = express.Router();

const checkAuth = require('../../middlewares/auth/checkAuth');

const Pokemon = require('../../models/Pokemon');
const User = require('../../models/User');

router.get('/', (req, res) => {
    const { offset, limit } = req.query;
    Pokemon.find()
        .skip(offset * limit)
        .limit(parseInt(limit))
        .then(pokemons =>  {
            if(req.userId) {
                return res.status(200).json({pokemons, userId: req.userId})
            }
            res.status(200).json(pokemons)
        })
        .catch(() => res.status(500).send("There was a problem with finding pokemons"))
});

router.get('/caught-pokemons', checkAuth, (req, res) => {
    const {offset, limit} = req.query;
    User.findById(req.userId, {password: 0})
        .then(user => {
            if (!user) return res.status(404).send("No user found.");
            res.status(200).json(user.caughtPokemons.slice(offset * limit, offset * limit + limit));
        })
        .catch(() => res.status(500).send("There was a problem finding the user."));
});

router.put('/', checkAuth, (req, res) => {
    const { pokemonId, time } = req.body;
    User.findByIdAndUpdate(req.userId, { $push: { caughtPokemons: {pokemonId, time} } })
        .then(() => {
            return Pokemon.findIdAndUpdate(pokemonId, { $push: { users: req.userId } })
        })
        .then(() => res.status(200).send("Updated"))
        .catch(() => res.status(500).send("There was a problem with updating"));
});

router.get('/:id', (req, res) => {
    Pokemon.findOne({number: req.params.id})
        .then(pokemon => res.json(pokemon))
        .catch(() => res.status(500).send("There was a problem with finding pokemon"))
});

module.exports = router;