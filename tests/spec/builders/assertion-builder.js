var g = require("../../../include");
var dummies = require("./dummies");

function AssertionBuilder(scarletBuilder, instances, interceptor) {

	var self = this;
	self.log = scarletBuilder.log;

	self.methodWasCalled = function(){
		self.log.debug(AssertionBuilder, "methodWasCalled", "Checking Methods Called");
		g.ext.enumerable.forEach(instances, function(instance){
			self.log.info(AssertionBuilder, "methodWasCalled", "Asserting Method Called for Instance", [instance]);
			g.assert(instance.methodCalled);
		});
		interceptor.methodCalled();
		return self;
	};

	self.methodWithReturnWasCalled = function(){
		g.ext.enumerable.forEach(instances, function(instance){
			self.log.info(AssertionBuilder, "methodWithReturnWasCalled", "Asserting Method With Return Called for Instance", [instance]);
			g.assert(instance.methodWithReturnCalled);
		});
		interceptor.methodWithReturnCalled();
		return self;
	};

	self.anyMethodWasCalled = function(){
		g.assert(self.methodWasCalled() || self.methodWithReturnWasCalled());
		interceptor.methodCalled();
		return self;
	};

	self.allInvoked = function(){
		g.assert(self.methodWasCalled() && self.methodWithReturnWasCalled());
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