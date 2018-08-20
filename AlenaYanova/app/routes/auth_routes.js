const
  AuthenticationController = require('../controllers/authentification'),
  passportService = require('../../config/passport'),
  passport = require('passport');

const requireLogin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.post('/register', AuthenticationController.register);
  app.post('/login', requireLogin, AuthenticationController.login);
};