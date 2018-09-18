import express from 'express';
import bodyParser from 'body-parser';
import Pokemon from '../models/Pokemon';
import { pokemons } from '../../../pokemons.json';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  Pokemon.deleteMany({})
  .then( () => Pokemon.insertMany( pokemons ))
  .then( () => (
    res.status(200).send('Database have been initialised')
  ))
  .catch( err => {
    res.status(500).send('Something went wrong');
    return console.error(err);
  });
});

export default router;
