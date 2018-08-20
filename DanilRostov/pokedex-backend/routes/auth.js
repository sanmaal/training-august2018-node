const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../models/user');
const checkToken = require('../utils/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');

// REGISTER USER
router.post('/register', (req, res) => {
  const encodedPass = bcrypt.hashSync(req.body.password, 10);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: encodedPass
  })
  .then(user => {
    const token = jwt.sign({ id: user._id }, config.secret, { 
      expiresIn: 3600 
    });
    res.status(200).send({ 
      isAuth: true, 
      token: token
    });
  })
  .catch(err => res.status(500).send(err));
});

// AUTHORIZE USER
router.get('/authorize', checkToken, (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).send({ 
      isAuth: false, 
      status: 'No token' 
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ 
        isAuth: false, 
        status: 'Failed to auth token' 
      });
    }
    User.findById(decoded.id, { password: 0 })
      .catch(err => res.status(500).send(err))
      .then(user => {
        next(user)
      });
  });
});

router.use((user, req, res, next) => res.status(200).send(user));

// LOGIN USER
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ 
          isAuth: false, 
          token: null 
        });
      }
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 3600
      });
      res.status(200).send({ 
        isAuth: true, 
        token: token 
      });
    })
    .catch(err => res.status(500).send('Server error'));
});

module.exports = router;