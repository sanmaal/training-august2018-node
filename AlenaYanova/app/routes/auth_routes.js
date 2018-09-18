'use strict';

const
  AuthenticationController = require('../controllers/authentification');

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationController.register
  );
  app.post(
    '/login',
    AuthenticationController.login
  );
};