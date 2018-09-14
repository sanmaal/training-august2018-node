module.exports = function(array, property, value){
	console.log(array, property, value)
	let result = {};
	array.forEach(function(item){
		if(item[property] == value){
			result = item;
			return;
		}
	})
	return result;
}