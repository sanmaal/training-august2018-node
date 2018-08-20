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

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { error: 'This email not exist. Please try again.' });
      }
      user.comparePassword(password)
        .then(isMatch => {
          if (!isMatch) {
            return done(null, false, { error: 'Your password is incorrect. Please try again.' });
          }
          return done(null, user);
        })
        .catch(err => done(err))
    })
    .catch(err => done(err));
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload._id, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);