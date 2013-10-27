var g = require("../../../include");
var dummies = require("./dummies");

function AssertionBuilder(scarletBuilder, instances, interceptor) {

	var self = this;
	self.log = scarletBuilder.log;

	self.methodWasCalled = function(){
		g.ext.enumerable.forEach(instances, function(instance){
			g.ll(instance);
			g.assert(instance.methodCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.methodWithReturnWasCalled = function(){
		g.ext.enumerable.forEach(instances, function(instance){
			g.assert(instance.methodWithReturnCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.anyMethodWasCalled = function(){
		g.assert(self.methodCalled() || self.methodWithReturnCalled());
		interceptor.methodCalled();
		return self;
	};

	self.reset = function(){
		instance.reset();
		interceptor.reset();
		return self;
	};

};

module.exports = AssertionBuilder;