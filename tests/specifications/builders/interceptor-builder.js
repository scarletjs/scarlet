var g = require("../../../include");
var dummies = require("./dummies");
var ext = require("../../../lib/extensions");

function Interceptor(scarletBuilder){

	var self = this;
	self.timesCalled = 0;
	self.invocation = null;
	self.log = scarletBuilder.log;

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
	self.log = scarletBuilder.log;
	self.interceptor = new Interceptor(scarletBuilder);

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