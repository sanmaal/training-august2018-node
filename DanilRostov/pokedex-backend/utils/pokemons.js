"use strict"
const generateIds = (start, limit) => {
  let ids = [];
  let counterMinus = Number(limit);
  let counterPlus = Number(start) + 1;
  while (counterMinus > 0) {
    ids.push(counterPlus.toString());
    counterMinus -= 1;
    counterPlus += 1;
  }
  return ids;
};

module.exports = generateIds;