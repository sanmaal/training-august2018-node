const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");

const app = express();

exports.createUser = function(userData) {
  var user = {
    userName: userData.name,
    password: hash(userData.password)
  };
  return new User(user).save();
};

exports.getUser = function(login) {
  return User.findOne({ userName: login });
};

// create the login get and post routes
router.get("/getUser", (req, res, next) => {
  console.log("Inside GET /login callback function");
  console.log(req.session.user);
  res.json(req.session.user);
});

router.post("/login", (req, res, next) => {
  if (req.session.user) {
    res.send(req.session.user.username);
  }
  User.findOne({ username: req.body.user.username })
    .then(user => {
      if (bcrypt.compareSync(req.body.user.password, user.password)) {
		req.session.user = {id: user._id, name: user.username};
		console.log(req.session.user)
      } else {
        next;
      }
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function() {
    res
      .clearCookie("connect.sid", { path: "/" })
      .status(200)
      .send("Cookie deleted.");
  });
});

router.post("/signup", (req, res, next) => {
  let user = new User({
    username: req.body.user.username,
    password: bcrypt.hashSync(req.body.user.password)
  });
  user
    .save()
    .then(data => {
      res.send(user);
    })
    .catch(next);
});

router.get("/api/currentUserData", function(req, res, next) {
	console.log(req.session)
  if (req.session.user) {
    res.send(req.session.user);
  }
});

router.get("/api/caughtPokemons", (req, res) => {
	console.log(req.session.user)
  if(!req.session.user){
	res.status(403).send();
  }
});

module.exports = router;
