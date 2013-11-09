function createNew() {
	var BuilderLogger = require("./../builder-logger");
	var log = new BuilderLogger();

	var instance = {
		methodCalled: false,
		methodWithReturnCalled: false,
		__type__: "scarlet.tests.spec.builders.dummies.ObjectLiteral"
	};

	instance.method = function() {
		instance.methodCalled = true;
		log.debug(instance, "method", "Set instance.methodCalled", [instance]);
	};

	instance.methodWithReturn = function() {
		instance.methodWithReturnCalled = true;
		log.debug(instance, "method", "Set instance.methodWithReturnCalled", [instance]);
		return "any";
	};

	instance.reset = function() {
		instance.methodCalled = false;
		instance.methodWithReturnCalled = false;
	};

	return instance;
}

module.exports = createNew;