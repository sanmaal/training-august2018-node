const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon");
const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const createToken = require("../auth/createToken");
const defineUserByToken = require("../auth/defineUserByToken");
const createPagination = require("../helpers/pagination");
const compareLists = require("../helpers/compareLists");
const findInArray = require("../helpers/findInArray");

router.get("/pokemons", function(req, res, next) {
  const limit = parseInt(req.query.limit ? req.query.limit : 20);
  const page = parseInt(req.query.page);

  Pokemon.find({})
    .then(pokemons => {
      let result = createPagination(pokemons, limit, page);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

router.post("/pokemons", function(req, res, next) {
  let pokemon = new Pokemon(req.body);
  pokemon
    .save()
    .then(data => {
      res.send(pokemon);
    })
    .catch(next);
});

router.put("/pokemons/:id", function(req, res, next) {
  Pokemon.findByIdAndUpdate({ id: req.params.id }, req.body).then(data => {
    Pokemon.findOne({ id: req.params.id }).then(pokemon => {
      res.send(pokemon);
    });
  });
});

router.delete("/pokemons/:id", function(req, res, next) {
  Pokemon.findOneAndRemove({ id: req.params.id }).then(pokemon => {
    res.send(pokemon);
  });
  res.send({ type: "DELETE" });
});

router.post("/newUser", function(req, res, next) {
  User.findOne({ username: req.body.name })
    .then(user => {
      if (user) {
        res.status(403).send({ userExists: true });
      }
    })
    .catch(err => {
      console.log(err);
    });

  let user = new User({
    username: req.body.name,
    password: bcrypt.hashSync(req.body.password),
    caughtPokemons: []
  });

  user
    .save()
    .then(data => {
      Token.create({
        userId: data._id
      })
        .then(() => {
          res.status(200).send({ userCreated: true });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/login", function(req, res, next) {
  User.findOne({ username: req.body.name })
    .then(data => {
      if (bcrypt.compareSync(req.body.password, data.password)) {
		let userToken = createToken({ id: data._id });
        Token.findOneAndUpdate({ userId: data._id, token: userToken })
          .then(data => {
			console.log("Token successfully created");
          })
          .catch(err => {
            console.log(err);
          });
        res.status(200).send({ token: userToken });
      } else {
        res.status(403).send("Invalid password");
      }
    })
    .catch(err => {
      res.send("Authentification failed");
    });
});

router.get("/caughtPokemons", function(req, res, next) {
  const limit = parseInt(req.query.limit ? req.query.limit : 20);
  const page = parseInt(req.query.page);
  const allWithCaught = req.query.all ? req.query.all : false;

  const user = defineUserByToken(req.headers.token);

  user.then(data => {
    if (data == null) {
      res
        .status(403)
        .send("Cannot provide caught pokemons list. Log in first.");
    } else {
      User.findOne({ _id: data.id })
        .then(user => {
          if (allWithCaught) {
            Pokemon.find({})
              .then(all => {
                const paginatedResult = createPagination(all, limit, page);
                !user.caughtPokemons || !user.caughtPokemons.length
                  ? res.send(paginatedResult)
                  : "";
                return paginatedResult;
              })
              .then(page => {
                const compared = compareLists(user.caughtPokemons, page);
                res.send(compared);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            let ids = [];
            user.caughtPokemons.forEach(function(item) {
              ids.push(item.id);
            });
            Pokemon.find({
              id: { $in: ids }
            })
              .then(paginateData => {
                let paginatedResult = createPagination(
                  paginateData,
                  limit,
                  page
                );
                return paginatedResult;
              })
              .then(page => {
                const compared = compareLists(user.caughtPokemons, page);
                res.send(compared);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          res.status(404).send();
        });
    }
  });
});

router.post("/catchPokemon", function(req, res, next) {
  const user = defineUserByToken(req.headers.token);

  user.then(data => {
    if (data == null) {
      res
        .status(403)
        .send("Cannot provide caught pokemons list. Log in first.");
    } else {
      User.findOne({ _id: data.id })
        .then(user => {
          if (!user.caughtPokemons.includes(req.body)) {
            user.caughtPokemons.push(req.body);
            user.save();
            Pokemon.findOne({ id: req.body.id }).then(data => {
              res.send(data);
            });
          } else {
            res.status(403).send("You already have this one");
          }
        })
        .catch(err => {
          res.status(404).send();
        });
    }
  });
});

router.get("/leavePokemon/:id", function(req, res, next) {
  const user = defineUserByToken(req.headers.token);

  user.then(data => {
    if (data == null) {
      res
        .status(403)
        .send("Cannot provide caught pokemons list. Log in first.");
    } else {
      User.findOne({ _id: data.id })
        .then(user => {
          const targetPokemon = findInArray(
            user.caughtPokemons,
            "id",
            req.params.id
          );
          if (targetPokemon) {
            const index = user.caughtPokemons.indexOf(targetPokemon);
            user.caughtPokemons.splice(index, index);
            user.save();
            res.status(200).send();
          } else {
            res.status(403).send("We dont have this one");
          }
        })
        .catch(err => {
          res.status(404).send();
        });
    }
  });
});

router.get("/getCertain/:id", function(req, res, next) {
  if (req.headers.token == "") {
    Pokemon.findOne({ id: req.params.id }).then(pokemon => {
      res.send(pokemon);
    });
  } else {
    const user = defineUserByToken(req.headers.token);

    user
      .then(data => {
        Pokemon.findOne({ id: req.params.id })
          .then(pokemon => {
            return pokemon;
          })
          .then(pokemon => {
            let result = pokemon;
            if (data != null) {
              User.findOne({ _id: data.id }).then(user => {
                const targetPokemon = findInArray(
                  user.caughtPokemons,
                  "id",
                  req.params.id
                );
                result.caughtDate = targetPokemon.date;
                res.send(result);
              });
            }
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.get("/releaseAll", function(req, res, next) {
  const user = defineUserByToken(req.headers.token);

  user.then(data => {
    if (data == null) {
      res
        .status(403)
        .send("Cannot provide caught pokemons list. Log in first.");
    } else {
      User.findOne({ _id: data.id })
        .then(user => {
          user.caughtPokemons = [];
          user.save();
          res.send(user.caughtPokemons);
        })
        .catch(err => {
          res.status(404).send();
        });
    }
  });
});

module.exports = router;
