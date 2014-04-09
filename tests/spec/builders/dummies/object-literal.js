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

	return instance;
}

module.exports = createNew;