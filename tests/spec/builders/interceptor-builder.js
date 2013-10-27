var g = require("../../../include");
var dummies = require("./dummies");

function Interceptor(scarletBuilder){

	var self = this;
	self.timesCalled = 0;
	self.proxyInfo = null;
	self.log = scarletBuilder.log;

	self.intercept = function(info, method, args){
		self.timesCalled += 1;
		self.proxyInfo = info;
		return method.apply(this, args);
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

	g.ext.enumerable.forEach(instances, function(instance){
		var proxiedType = 
			scarletBuilder
				.scarlet
				.intercept(instance)
				.using(self.interceptor.intercept);
	});

};

module.exports = InterceptorBuilder;