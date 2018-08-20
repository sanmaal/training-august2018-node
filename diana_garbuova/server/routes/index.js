const users = require('./users');
const auth = require('./auth');
const pokebase = require('./pokebase');

const init = (app) => {
  app.use('/auth', auth);
  app.use('/users', users);
  app.use('/pokebase', pokebase);
};

module.exports = { init };