var g = require("../../../include");
var dummies = require("./dummies");

function AssertionBuilder(scarletBuilder, instances, interceptor) {

	var self = this;
	self.log = scarletBuilder.log;

	self.methodCalled = function(){
		g.ext.enumerable.forEach(instances, function(instance){
			g.assert(instance.methodCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.methodWithReturnCalled = function(){
		g.ext.enumerable.forEach(instances, function(instance){
			g.assert(instance.methodWithReturnCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.anyMethodCalled = function(){
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