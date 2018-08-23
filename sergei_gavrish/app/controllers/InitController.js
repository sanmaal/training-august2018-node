import express from 'express';
import bodyParser from 'body-parser';
import Pokemon from '../models/Pokemon';
import { pokemons } from '../../pokemons.json';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', async (req, res) => {
  
  await Pokemon.deleteMany({});

  await Pokemon.insertMany( pokemons )
    .then( pokemons => (
      res.status(200).send('Database have been initialised')
    ))
    .catch( error => {
      return res.status(500).send(error);
    });
});

export default router;
