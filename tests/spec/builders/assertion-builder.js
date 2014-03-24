var assert = require("assert");
var dummies = require("./dummies");
var enumerable = require("../../../lib/extensions/enumerable");

function AssertionBuilder(scarletBuilder, instances, interceptor) {

	var self = this;
	self.log = scarletBuilder.log;

	self.methodWasCalled = function(){
		self.log.debug(AssertionBuilder, "methodWasCalled", "Checking Methods Called");
		enumerable.forEach(instances, function(instance){
			self.log.info(AssertionBuilder, "methodWasCalled", "Asserting Method Called for Instance", [instance]);
			assert(instance.methodCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.methodWithReturnWasCalled = function(){
		enumerable.forEach(instances, function(instance){
			self.log.info(AssertionBuilder, "methodWithReturnWasCalled", "Asserting Method With Return Called for Instance", [instance]);
			assert(instance.methodWithReturnCalled);
		});
		interceptor.methodWithReturnCalled();
		return self;
	};

	self.anyMethodWasCalled = function(){
		assert(self.methodWasCalled() || self.methodWithReturnWasCalled());
		interceptor.methodCalled();
		return self;
	};

	self.allInvoked = function(){
		assert(self.methodWasCalled() && self.methodWithReturnWasCalled());
		interceptor.methodCalled();
		return self;
	};

	self.reset = function(){
		instance.reset();
		interceptor.reset();
		return self;
	};
}

module.exports = AssertionBuilder;