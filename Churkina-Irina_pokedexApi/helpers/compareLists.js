module.exports = function(indexes, compareWith) {
  let resultArray = compareWith;

  for (var i = 0; i < indexes.length; i++) {
    resultArray = resultArray.map(function(item) {
      if (indexes[i].id == item.id) {
        item.caught = true;
        return item;
      } else {
        return item;
      }
    });
  }
  console.log(resultArray);
  return resultArray;
};
