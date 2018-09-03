const mongoose = require('mongoose');
const { pokemons } = require('./pokemons.json');
const mainBD = require('./config/bdconfig').mainBD;
const Pokemon = require('./db/models/Pokemon');
 mongoose
  .connect(mainBD, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...') )
  .then(() => Pokemon.deleteMany({}) )
  .then(() => Pokemon.insertMany(pokemons) )
  .then(() => {
    console.log('Init data loaded into MongoDB successfully!');
    process.exit(0);
  })
  .catch(err => console.log(err)); 