var g = require("../../../include");
var dummies = require("./dummies");

function Interceptor(scarletBuilder) {

	var self = this;
	self.results = [];
	self.timesCalled = 0;
	self.proxyInfo = null;
	self.log = scarletBuilder.log;

	self.intercept = function(info, method, args) {
		
		self.log.debug(Interceptor, "methodCalled", "Inside Interceptor ", [self, info]);
		
		if (typeof(self.results[info.memberName]) == "undefined")
			self.results[info.memberName] = {
				timesCalled: 0,
				results: []
			};
		
		var current = self.results[info.memberName];
		current.timesCalled += 1;
		current.proxyInfo = info;
		current.result = method.apply(this, args);

		return current.result;
	};

	self.reset = function() {
		self.results = [];
	};
}

function InterceptorBuilder(scarletBuilder, instances, replaceInstancesCallback) {

	var self = this;
	self.log = scarletBuilder.log;
	self.interceptor = new Interceptor(scarletBuilder);

	self.methodCalled = function(times) {
		self.log.debug(InterceptorBuilder, "methodCalled", "Inside Method Called", [self.interceptor, self.interceptor.results]);
		if (typeof(times) == "undefined")
			g.assert(self.interceptor.results["method"].timesCalled > 0);
		else
			g.assert(self.interceptor.results["method"].timesCalled == times, "Expected " + times + " call(s) but only got " + self.interceptor.results["method"].timesCalled);
		return self;
	};

	self.methodWithReturnCalled = function(times) {
		self.log.debug(InterceptorBuilder, "methodWithReturnCalled", "Inside Method With Return Called", [self.interceptor, self.interceptor.results]);
		if (typeof(times) == "undefined")
			g.assert(self.interceptor.results["methodWithReturn"].timesCalled > 0);
		else
			g.assert(self.interceptor.results["methodWithReturn"].timesCalled == times, "Expected " + times + " call(s) but only got " + self.interceptor.results["methodWithReturn"].timesCalled);
		return self;
	};

	self.reset = function() {
		self.interceptor.reset();
	};

	var proxiedInstances = [];
	g.ext.enumerable.forEach(instances, function(instance) {
		var proxiedTypeOrInstance =
			scarletBuilder
			.scarlet
			.intercept(instance)
			.using(self.interceptor.intercept)
			.proxy();
		proxiedInstances.push(proxiedTypeOrInstance);
	});

	if (!g.ext.object.isNull(replaceInstancesCallback)) {
		self.log.debug(InterceptorBuilder, InterceptorBuilder, "Replacing Instances with Proxies", proxiedInstances);
		replaceInstancesCallback(proxiedInstances);
	}

};

module.exports = InterceptorBuilder;