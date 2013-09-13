var g = require("../../../include");
var dummies = require("../dummies");
var ext = require("./../../../lib/extensions");
var ext = require("../../../lib/extensions");

function Interceptor(){

	var self = this;
	self.timesCalled = 0;
	self.invocation = null;

	self.intercept = function(proceed, invocation){
		self.timesCalled += 1;
		self.invocation = invocation;
		return proceed();
	};

	self.reset = function(){
		self.invocation = null;
		self.timesCalled = false;
	};
}

function InterceptorBuilder(scarletBuilder, instances) {
	
	var self = this;
	self.interceptor = new Interceptor();

	self.methodCalled = function(times){
		if (typeof(times) == "undefined")
			g.assert(self.interceptor.timesCalled > 0);
		else 
			g.assert(self.interceptor.timesCalled == times, "Expected " + times + " call(s) but only got " + self.interceptor.timesCalled);
		return self;
	};

	self.reset = function(){
		self.interceptor.reset();
	};

	ext.enumerable.forEach(instances, function(instance){
		scarletBuilder
			.scarlet
			.intercept(instance)
			.using(self.interceptor.intercept);
	});

};

module.exports = InterceptorBuilder;