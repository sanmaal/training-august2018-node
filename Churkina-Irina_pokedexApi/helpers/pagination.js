module.exports = function(array, limit, page) {
  if (page == undefined || isNaN(page)) {
    return array;
  }
  let result = array.filter(function(curr, index) {
    if (index >= limit * (page - 1) && index < limit * (page - 1) + limit) {
      return curr;
    }
  });
  return result;
};
