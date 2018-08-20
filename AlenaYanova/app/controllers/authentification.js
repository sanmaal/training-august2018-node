const
  jwt = require('jsonwebtoken'),
  User = require('../models/user'),
  config = require('../../config/main');

const generateToken = (user) => {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080
  });
};

const setUserInfo = (request) => {
  return {
    _id: request._id,
    name: request.profile.name,
    email: request.email,
    role: request.role,
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(403).json({ error: 'This email not exist. Please try again.' });
      }
      user.comparePassword(req.body.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(403).json({ error: 'Your password is incorrect. Please try again.' });
          }
          const userInfo = setUserInfo(user);
          res.status(200).json({ token: generateToken(userInfo) });
        })
        .catch(err => next(err))
    })
    .catch(err => next(err));
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }
  if (!name) {
    return res.status(422).json({ error: 'You must enter your name.' });
  }
  if (!password) {
    return res.status(422).json({ error: 'You must enter a password.' });
  }
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).json({ error: 'That email address is already in use.' });
    }
    let user = new User({
      email: email,
      password: password,
      profile: { name: name }
    });
    user.save((err, user) => {
      if (err) { return next(err); }
      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: generateToken(userInfo)
      });
    });
  });
};

exports.checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token){
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err){
        res.status(403).json({ error: 'Failed to authentificate token.' })
      } else {
        // TODO: add redis for saving active tokens
        req.user = decoded;
        next();
      }
    })
  } else {
    res.status(403).json({ error: 'No token provided.' })
  }
};