const express = require('express');
const api = require('../api.js');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post ('/login', (req, res, next) => {
  if (req.session.user) return res.redirect('/');

  api.checkUser (req.body)
      .then (function (user) {
        if (user) {
          req.session.user = { id: user._id, name: user.name };
          res.redirect('/');
        } else {
          return next(error)
        }
      })
      .catch (function (error) {
        return next(error);
      })
});

router.post ('/registration', (req, res) => {
  api.createUser (req.body)
      .then (() => {
        res.send('User Added')
      })
      .catch ((err) => {
        if (err) {
          return res.json(err);
        }
      })
});

router.get ('/logout', (req, res, next) => {
  if (req.session.user) {
    delete req.session.user;
    res.redirect ('/');
  } else {
    return next(error);
  }
});

module.exports = router;
