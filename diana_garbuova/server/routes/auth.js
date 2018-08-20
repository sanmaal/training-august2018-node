const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const createToken = require('../common/createToken');
const User = require('../models/user');

router.use(bodyParser.json());

router.post('/register', (req, res) => {
  console.log({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    catched: []
  });
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password)
  })
  .then((user) => {
    res.status(200).send({ token: createToken({ id: user._id }) });
  })
  .catch((e) => {
    console.log(e)
    res.status(500).send('Registration failed');
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
  .then((userInfo) => {
    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
      res.status(200).send({ token: createToken({ id: userInfo._id })});
    } else {
      res.status(500).send('Authentication failed')
    }
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;