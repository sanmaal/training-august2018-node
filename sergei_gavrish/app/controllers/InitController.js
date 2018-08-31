import express from 'express';
import bodyParser from 'body-parser';
import Pokemon from '../models/Pokemon';
import { pokemons } from '../../pokemons.json';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  Pokemon.deleteMany({})
  .then( () => Pokemon.insertMany( pokemons ))
  .then( () => (
    res.status(200).send('Database have been initialised')
  ))
  .catch( error => res.status(500).send(error));
});

export default router;
