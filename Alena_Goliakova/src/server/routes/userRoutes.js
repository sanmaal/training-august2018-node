const userActions = require ('../utils/userActions');

module.exports = function (app, db) {
  app.post ('/user/register', (req, res, next) => {
    userActions.register (req, res, next);
  });
  app.post ('/user/login', (req, res, next) => {
    userActions.login (req, res, next);
  });
  app.post ('/user/logout', (req, res, next) => {
    userActions.logout (req, res);
  });
  app.all ('/captured-pokemons', userActions.mustAuthenticatedMw);
  app.all ('/pokemons/:id', userActions.mustAuthenticatedMw);
};
