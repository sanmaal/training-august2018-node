const router = require('express').Router();
const bodyParser = require('body-parser');

const Pokemon = require('../models/pokemon');
const User = require('../models/user');
const checkToken = require('../config/checkToken');

router.use(bodyParser.json());

router.get('/:page?', async(req, res) => {
  const { limit } = req.query;
  const pokemons = await Pokemon
  .find()
  .skip((limit * req.params.page) - limit)
  .limit(Number(limit));
  res.status(200).send(pokemons);
});

router.post('/:pokename', checkToken, (req, res) => {
  Pokemon.findOne({ name: req.params.pokename }, (err, pokemon) => {
    if (pokemon) {
      User.findByIdAndUpdate(
        req.userId,
        { $push: { catched: pokemon } },
      )
      .then(() => {
        res.status(200).send(`${req.params.pokename} was cathed`);
      })
      .catch(() => {
        res.status(404).send('User not found');
      });
    } else {
      res.status(500).send('Current pokemon does not exist');
    }
  })
});

router.get('/catched', checkToken, (req, res) => {
  User.findById(req.userId)
  .then((user) => {
    res.status(200).send(user.catched);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

module.exports = router;