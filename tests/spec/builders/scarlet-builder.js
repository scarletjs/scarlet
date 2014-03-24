var assert = require("assert");
var dummies = require("./dummies");
var logger = require("../../../lib/extensions/logger");
var enumerable = require("../../../lib/extensions/enumerable");

function ScarletBuilder(scarlet){

	var AssertionBuilder = require("./assertion-builder");
	var InterceptorBuilder = require("./interceptor-builder");

	var self = this;
	self.results = [];
	self.instances = [];
	self.interceptor = null;
	self.scarlet = scarlet;

	self.withNamedFunction = function(){
		var instance = new dummies.NamedFunc(self);
		logger.info(ScarletBuilder, "withNamedFunction", "Creating Named Function", [instance]);
		self.instances.push(new dummies.NamedFunc(self));
		return self;
	};

	self.withObjectLiteral = function(){
		var instance = dummies.ObjectLiteral(self);
		logger.info(ScarletBuilder, "withObjectLiteral", "Creating Object Literal", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withPrototypeFunction = function(){
		var instance = new dummies.PrototypeFunc(self);
		logger.info(ScarletBuilder, "withPrototypeFunction", "Creating Prototype Function", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withUnamedFunction = function(){
		var instance = new dummies.UnnamedFunc(self);
		logger.info(ScarletBuilder, "withUnamedFunction", "Creating Unamed Function", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withInstances = function(){
		self.withNamedFunction();
		self.withObjectLiteral();
		self.withPrototypeFunction();
		self.withUnamedFunction();
		return self;
	};

	self.withInterceptor = function() {
		assert(self.instances.length !== 0, "Please make sure you allocate an instance first using 'withNamedFunction()', 'withObjectLiteral()', 'withPrototypeFunction()' or 'withUnamedFunction()'");
		self.interceptor = new InterceptorBuilder(self, self.instances, function(proxiedInstances){ self.instances = proxiedInstances; });
		logger.info(ScarletBuilder, "withInterceptor", "Creating Interceptor", [self.interceptor]);
		return self;
	};

	self.withCustomInterceptor = function(interceptor){
		assert(self.instances.length !== 0, "Please make sure you allocate an instance first using 'withNamedFunction()', 'withObjectLiteral()', 'withPrototypeFunction()' or 'withUnamedFunction()'");
		logger.info(ScarletBuilder, "withCustomInterceptor", "Creating Custom Interceptor", [interceptor]);
		self.interceptor = interceptor;
		return self;
	};

	self.invokeMethod = function(){
		logger.debug(ScarletBuilder, "invokeMethod", "Invoking Methods");
		enumerable.forEach(self.instances, function(instance){
			logger.debug(instance, "method", "Before Invoking Instance Method", [instance]);
			instance.method();
			logger.debug(instance, "method", "After Invoking Instance Method", [instance]);
		});
		return self;
	};

	self.invokeMethodWithReturn = function(){
		self.results = [];
		logger.debug(ScarletBuilder, "invokeMethodWithReturn", "Invoking Methods with Return Values");
		enumerable.forEach(self.instances, function(instance){
			logger.debug(instance, "methodWithReturn", "Before Invoking Instance Method With Return", [instance]);
			var result = instance.methodWithReturn();
			logger.debug(instance, "methodWithReturn", "After Invoking Instance Method With Return", [instance, result]);
		});
		logger.debug(self, "methodWithReturn", "Return Values from Methods", [self.results]);
		return self;
	};

	self.invokeAll = function(){
		self.invokeMethod();
		self.invokeMethodWithReturn();
		return self;
	};

	self.assert = function(){
		var assertBuilder = new AssertionBuilder(self, self.instances, self.interceptor);
		logger.debug(ScarletBuilder, "assert", "Creating Assertion Builder", [assertBuilder]);
		return assertBuilder;
	};
}

ScarletBuilder.for = function(scarlet){
	return new ScarletBuilder(scarlet);
};

module.exports = ScarletBuilder;