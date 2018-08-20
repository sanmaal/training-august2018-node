const
  passport = require('passport'),
  User = require('../app/models/user'),
  config = require('./main'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

const localOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { error: 'This email not exist. Please try again.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return next(err);
      }
      if (!isMatch) {
        return next(null, false, { error: 'Your password is incorrect. Please try again.' });
      }
      return next(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  User.findById(jwt_payload._id, (err, user) => {
    if (err) { return next(err, false); }
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);