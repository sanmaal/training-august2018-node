import express from 'express';
import bodyParser from 'body-parser';
import User from '../models/User';
import Pokemon from '../models/Pokemon';
import { authorization } from '../middleware/Authorization';
import { checkPokemon } from '../middleware/CheckPokemon';
import pokemonUrlBuilder from '../utils/urlbuilders/PokemonUrlBuilder';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get(
  pokemonUrlBuilder
    .build()
    .use(),
  (req, res) => {
    if(req.headers['x-access-token']) return res.redirect('pokemons/user');

    const { _page, _limit } = req.query;
    Pokemon.find()
      .skip(_page * _limit - _limit)
      .limit(parseInt(_limit))
      .then( pokemons => (
        res.status(200).send(pokemons)
      ))
      .catch( err => console.error(err));
});

router.get(
  pokemonUrlBuilder
    .build()
    .user()
    .use(),
  authorization,
  (req, res) => {

    const { _page, _limit } = req.query;
    Pokemon.find()
      .skip(_page * _limit - _limit)
      .limit(parseInt(_limit))
      .populate('catchedByUsers', 'name')
      .then( (pokemons) => {
        res.status(200).send(pokemons)
      })
      .catch( err => console.error(err));
});

router.get(
  pokemonUrlBuilder
    .build()
    .catched()
    .use(),
  authorization,
  (req, res) => {

    const { _page, _limit } = req.query;
    User.findById(req.userId)
    .populate('catched', 'name id')
    .then( (user) => {
      if(!user) return res.status(404).send('User not found');
      const { catched } = user;
      res.status(200).send(catched.slice(_page * _limit - _limit, _page * _limit));
    });
});

router.put(
  pokemonUrlBuilder
    .build()
    .catch()
    .use(),
  authorization,
  checkPokemon,
  (req, res) => {

    // Pokemon.findByIdAndUpdate(req.body.id, { $push: { catchedByUsers: req.userId }}, { 'new': true})
    //   .then( pokemon => console.log('Pokemon catched'))
    //   .catch( err => console.error(err));
    
    User.findByIdAndUpdate(req.userId, { $push: { catched: req.body.id }}, { 'new': true})
      .then( (response) => res.status(200).send(response))
      .catch( (err) => {
        if (err) return res.status(500).send(err);
      });

});

router.get(
  pokemonUrlBuilder
    .build()
    .pokemon()
    .use(),
  (req, res) => {
    Pokemon.findOne( {id: req.params.pokemonId} )
      .then( (pokemon) => {
        if(!pokemon) return res.status(404).send('There is no pokemon with this id');
        return res.status(200).send(pokemon);
      })
      .catch( err => console.error(err));
});

export default router;
