const
  passport = require('passport'),
  PokemonsController = require('../controllers/pokemons');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = (app) => {
  app.get('/pokemons/:id', PokemonsController.getPokemonById);
  app.get('/pokemons/page/:page', PokemonsController.getPokemons, PokemonsController.pagination);
  app.get('/pokemons/caught/page/:page', requireAuth, PokemonsController.getCaughtPokemons, PokemonsController.pagination);
  app.post('/pokemons/:id/catch', requireAuth, PokemonsController.catchPokemon);
};