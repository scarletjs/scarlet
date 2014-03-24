function createNew() {

	var instance = {
		methodCalled: false,
		methodWithReturnCalled: false,
		__type__: "scarlet.tests.spec.builders.dummies.ObjectLiteral"
	};

	instance.method = function() {
		instance.methodCalled = true;
	};

	instance.methodWithReturn = function() {
		instance.methodWithReturnCalled = true;
		return "any";
	};

	instance.reset = function() {
		instance.methodCalled = false;
		instance.methodWithReturnCalled = false;
	};

	return instance;
}

module.exports = createNew;