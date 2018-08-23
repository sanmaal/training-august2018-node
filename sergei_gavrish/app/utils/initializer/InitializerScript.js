import db from '../../config/db';
import mongoose from 'mongoose';
import Pokemon from '../../models/Pokemon';
import { pokemons } from '../../../pokemons.json';

const init = async () => {
  try {
    await Pokemon.deleteMany({});
    await Pokemon.insertMany( pokemons )
      .then( pokemons => (
        console.log('Database have been initialised')
      ))
    await mongoose.disconnect()
      .then( () => console.log('Conection closed'));
  } catch (error) {
    console.error(error);
  }
}

init();
