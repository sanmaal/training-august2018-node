const express = require('express');
const router = express.Router();

const { Pokemon, validatePokemon } = require('../models/Pokemon');
const { User } = require('../models/User');
const verifying = require('../middlewares/verifying');

router.get('/pokemons', (req, res) => {
    const { page, amount } = req.query;
    Pokemon.find()
        .skip(page*amount - amount)
        .limit(parseInt(amount))
        .then(pokemons => res.status(200).send(pokemons));
});

router.get('/pokemons/:id', (req, res) => {
    Pokemon.findOne({ id: req.params.id })
        .then(pokemon => {
            if (!pokemon) res.status(404).send('The pokemon was not found!');
        })
        .then(pokemon => res.status(200).send(pokemon))
        .catch(err => res.status(500).send('Error'));
});

router.get('/catched', verifying, (req, res) => {
        const { _id } = req.user;
        const { page, amount } = req.query;

        User.findById(_id).exec()
            .then(user => {
                res.status(200).send(user.catched.slice(page * amount - amount, page * amount));
            })
            .catch(error => {
                res.status(500).send('Error');
            });
});

router.put('/catched', verifying, async (req, res) => {
    const { error } = validatePokemon(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { _id } = req.user;
    const user = await User.findById(_id).exec();
    const pokemon = user.catched.find(pokemon => pokemon.id === +req.body.id);
    if (pokemon) return res.status(400).send('This pokemon is already catched!');

    User.findByIdAndUpdate(_id, {
        $push: { catched: req.body }
    }, { 'new': true})
    .then(() => res.status(200).send(req.body))
    .catch(error => res.status(500).send('Error'));
});

module.exports = router;