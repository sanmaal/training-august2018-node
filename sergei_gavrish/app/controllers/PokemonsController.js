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
    const { _page, _limit } = req.query;
    Pokemon.find({},{
      __v:0,
      catchedByUsers: 0,
    })
      .skip(_page * _limit - _limit)
      .limit(parseInt(_limit))
      .then( pokemons => (
        res.status(200).send(pokemons)
      ))
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
      });
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
      .then( pokemons => res.status(200).send(pokemons))
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
      });
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
      .populate({
        path: 'catchedPokemons',
        model: 'Pokemon'
      })
      .then( user => {
        if(!user) return res.status(404).send('User not found');
        const { catchedPokemons, datesOfCapture } = user;
        return res.status(200).send({catchedPokemons, datesOfCapture});
      })
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
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

    Pokemon.findByIdAndUpdate(req.body.id, { $push: { catchedByUsers: req.userId }}, { 'new': true})
      .then( () => User.findByIdAndUpdate(
          req.userId,
          { 
            $push: { catchedPokemons: req.body.id },
            datesOfCapture: {
              [req.body.id]: new Date(),
            }
          },
          { 'new': true}
        )
      )
      .then( response => res.status(200).send(response))
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
      });

});

router.get(
  pokemonUrlBuilder
    .build()
    .pokemon()
    .use(),
  (req, res) => {

    Pokemon.findOne({_id: req.params.pokemonId}, {
      __v:0,
      catchedByUsers: 0,  
    })
      .then( pokemon => {
        if(!pokemon) return res.status(404).send('There is no pokemon with this id');
        return res.status(200).send(pokemon);
      })
      .catch( err => {
        res.status(500).send('Something went wrong');
        return console.error(err);
      });

});

export default router;
