var g = require("../../../include");
var dummies = require("../dummies");
var ext = require("../../../lib/extensions");

var AssertionBuilder = require("./assertion-builder");
var InterceptorBuilder = require("./interceptor-builder");

function ScarletBuilder(scarlet){
	
	var self = this;
	self.instances = [];
	self.interceptor = null;
	self.scarlet = scarlet;

	self.withNamedFunction = function(){
		self.instances.push(new dummies.NamedFunc());
		return self;
	}

	self.withObjectLiteral = function(){
		self.instances.push(dummies.ObjectLiteral);
		return self;
	};

	self.withPrototypeFunction = function(){
		self.instances.push(new dummies.PrototypeFunc());
		return self;
	};

	self.withUnamedFunction = function(){
		self.instances.push(new dummies.UnnamedFunc());
		return self;
	};

	self.withInterceptor = function() {
		g.assert(self.instances.length != 0, "Please make sure you allocate an instance first using 'withNamedFunction()', 'withObjectLiteral()', 'withPrototypeFunction()' or 'withUnamedFunction()'");
		self.interceptor = new InterceptorBuilder(self, self.instances);
		return self;
	};

	self.withCustomInterceptor = function(interceptor){
		g.assert(self.instances.length != 0, "Please make sure you allocate an instance first using 'withNamedFunction()', 'withObjectLiteral()', 'withPrototypeFunction()' or 'withUnamedFunction()'");
		self.interceptor = interceptor;
		return self;
	};

	self.invokeMethod = function(){
		ext.enumerable.forEach(self.instances, function(instance){
			instance.method();
		});
		return self;
	};

	self.invokeMethodWithReturn = function(){
		ext.enumerable.forEach(self.instances, function(instance){
			instance.methodWithReturn();
		});
		return self;
	};

	self.assert = function(){
		return new AssertionBuilder(self.instances, self.interceptor);
	};
};

ScarletBuilder.for = function(scarlet){
	return new ScarletBuilder(scarlet);
};

module.exports = ScarletBuilder;