var g = require("../../../include");
var dummies = require("../dummies");
var ext = require("../../../lib/extensions");

function AssertionBuilder(instances, interceptor) {

	var self = this;

	self.methodCalled = function(){
		ext.enumerable.forEach(instances, function(instance){
			g.assert(instance.methodCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.methodWithReturnCalled = function(){
		ext.enumerable.forEach(instances, function(instance){
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