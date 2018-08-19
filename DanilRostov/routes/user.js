const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/user');

// CREATE USER
router.post('/user', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
      if (err) {
        return res.status(500).send("There was a problem with database");
      }
      res.status(200).send(user);
    });
});

// RETURN ALL THE USERS
router.get('/user', (req, res) => {
  User.find({}, (err, users) => {
    if (err) { 
      return res.status(500).send("There was a problem with finding the users");
    }
    res.status(200).send(users);
  });
});

// GET USER BY ID
router.get('/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem with finding the user");
    }
    if (!user) {
      return res.status(404).send("No user found");
    } 
    res.status(200).send(user);
  });
});

// DELETE USER BY ID
router.delete('/user/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem deleting the user");
    } 
    res.status(200).send(`User: ${user.name} was deleted`);
  });
});

// UPDATE USER BY ID
router.put('/user/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).send("There was a problem updating the user");
    } 
    res.status(200).send(user);
  });
});

module.exports = router;