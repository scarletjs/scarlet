function createNew() {

	var instance = {
		property : "any",
		name : "ObjectLiteral",
		__type__: "scarlet.tests.spec.builders.dummies.ObjectLiteral"
	};

	instance.method = function() {
	};

	instance.methodWithReturn = function() {
		return "any";
	};

	instance.errorMethod = function(){
		throw new Error("Any Error");
	};
	
	return instance;
}

module.exports = createNew;