import {db} from '../../config/config';
import mongoose from 'mongoose';
import Pokemon from '../../models/Pokemon';
import { pokemons } from '../../../pokemons.json';

Pokemon.deleteMany({})
  .then( () => Pokemon.insertMany( pokemons ))
  .then( pokemons => (
    console.log('Database have been initialised')
  ))
  .then( () => mongoose.disconnect()) 
  .then( () => console.log('Conection closed'))
  .catch( error => console.error(error));
