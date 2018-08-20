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
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
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
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

exports.roleAuthorization = (role) => {
  return (req, res, next) => {
    const user = req.user;
    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }
      if (foundUser.role === role) {
        return next();
      }
      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
};