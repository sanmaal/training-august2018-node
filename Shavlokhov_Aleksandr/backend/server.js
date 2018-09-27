import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import Pokemon from './models/pokemon';
import getToken from './utils/getToken'

let passport = require('passport');
let settings = require('../config/settings');
require('../config/passport')(passport);
let jwt = require('jsonwebtoken');
let User = require("./models/user");

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// auth
router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          let token = jwt.sign(user.toJSON(), settings.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/pokemons', (req, res) => {
    Pokemon.find({})
      .skip(+req.query.skip)
      .limit(9)
      .then((pokemonsList) => res.status(200).send(pokemonsList))
});

router.get('/caught_pokemons', passport.authenticate('jwt', { session: false}), (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    Pokemon.find({ captured: true })
    .skip(+req.query.skip)
    .limit(9)
    .then((pokemonsList) => res.status(200).send(pokemonsList))
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/pokemons/:id', (req, res) => {
  Pokemon.findOne({id: +req.params.id})
    .then((pokemon) => res.status(200).send(pokemon))
});

router.put('/pokemons/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  if (token) {
    Pokemon
    .findOne({id: +req.params.id}, (err, pokemon) => {
      if (err) return res.json({ error });
      pokemon.id = +req.params.id;
      pokemon.name = req.body.name;
      pokemon.date = req.body.date;
      pokemon.captured = req.body.captured;
      pokemon.save(error => {
        if (error) return res.json({ error });
        return res.json({ success: true });
      });
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
})

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));