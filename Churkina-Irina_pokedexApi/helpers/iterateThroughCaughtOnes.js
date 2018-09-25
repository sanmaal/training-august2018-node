const Pokemon = require('../models/pokemon');

module.exports = function(p, resultArray) {
  return Pokemon.findOne({ id: p }).then(data => {
    resultArray.push(data);
  });
};
