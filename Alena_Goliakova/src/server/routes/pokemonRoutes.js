const Pokemon = require ('../models/pokemon.js');

module.exports = function (app, db) {
  app.get ('/', function (req, res) {
    const {page} = req.query;
    const query = Pokemon.find ({}, null, {skip: 10 * (page - 1), limit: 10});

    query.exec (function (err, docs) {
      console.log (docs);
      res.send (docs);
    });
  });
};
