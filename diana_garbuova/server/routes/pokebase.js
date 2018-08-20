const router = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Pokemon = require('../models/pokemon');
const User = require('../models/user');
const { secret } = require('../config/secret');

router.use(bodyParser.json());

router.get('/', async(req, res) => {
  const pokemons = await Pokemon.find({}, 'name').exec();
  res.status(200).send(pokemons);
});

router.post('/:pokename', async (req, res) => {
  const token = req.headers.authorization;
  await Pokemon.findOne({ name: req.params.pokename })
  .then((pokemon) => {
    if (token) {
      const decoded = jwt.verify(token, secret);
      User.findByIdAndUpdate(
        decoded.id,
        { $push: { catched: pokemon } },
      )
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
    } else {
      res.status(401).send('Who are you?');
    }
  })
  .catch(() => {
    res.status(500).send('Current pokemon does not exist');
  });
});

router.get('/catched', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, secret);
    User.findById(decoded.id)
    .then((user) => {
      res.status(200).send(user.catched);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  } else {
    res.status(401).send('Who are you?');
  }
});

module.exports = router;