var objectName = module.exports = exports = function(object){

	if(object.name)
		return object.name;

	if(object.constructor){
		if(object.constructor.name)
			return object.constructor.name;
	}
	
	var funcNameRegex = /function\s([^(]{1,})\(/;
	var results = (funcNameRegex).exec((object).toString());
	if((results && results.length > 1))
		return results[1].trim();

	if(object instanceof Function)
		return "Function"

	return "Object";
};