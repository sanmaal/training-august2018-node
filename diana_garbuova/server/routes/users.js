const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user');

router.use(bodyParser.json());

router.get('/', async(req, res) => {
  const users = await User.find({}, 'username').exec();
  res.status(200).send(users);
});

module.exports = router;