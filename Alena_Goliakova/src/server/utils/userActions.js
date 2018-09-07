const User = require ('../models/user');
const crypto = require ('crypto');
const passport = require ('passport');
const LocalStrategy = require ('passport-local');

module.exports.register = function registerUser (req, res, next) {
  const {email, password} = req.body;
  if (email & password) {
    const hashPassword = crypto
      .createHmac ('sha256', password)
      .update ('I love cupcakes')
      .digest ('hex');
    const user = new User ({
      email: email,
      password: hashPassword,
      capturedPokemons: [],
    });
    user.save (() => {
      console.log ('user saved');
    });
  }
};

module.exports.mustAuthenticatedMw = function (req, res, next) {
  req.isAuthenticated () ? next () : res.redirect ('/');
};

module.exports.login = function (req, res, next) {
  passport.authenticate ('local', function (err, user, next) {
    return err
      ? next (err)
      : user
          ? req.logIn (user, function (err) {
              return err ? next (err) : res.redirect ('/');
            })
          : res.redirect ('/');
  }) (req, res, next);
};

module.exports.logout = function (req, res) {
  req.logout ();
  res.redirect ('/');
};

passport.use (
  new LocalStrategy (
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      const query = User.findOne ({email: email}, null, {});
      query.exec (function (err, user) {
        const hashPassword = crypto
          .createHmac ('sha256', password)
          .update ('I love cupcakes')
          .digest ('hex');
        return err
          ? done (err)
          : user
              ? hashPassword === user.password
                  ? done (null, user)
                  : done (null, false, {message: 'Incorrect password.'})
              : done (null, false, {message: 'Incorrect username.'});
        console.log (docs);
      });
    }
  )
);

passport.serializeUser (function (user, done) {
  done (null, user);
});

passport.deserializeUser (function (user, done) {
  done (null, user);
});
