var assert = require("assert");
var Invocation = require("./invocation");
var enumerable = require("../extensions/enumerable");
var ProxyInterceptor = require("../proxies/proxy-interceptor");

module.exports = function Interceptor() {
	"use strict";

	var self = this;
	self.proxy = null;
	self.interceptors = [];
	self.__typename__ = "scarlet.lib.interceptors.Interceptor";

	self.intercept = function(typeOrInstance, memberName, replaceTypeCallback) {
		assert(typeOrInstance);
		assert(replaceTypeCallback);
		self.proxy = new ProxyInterceptor(typeOrInstance, memberName);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback);
		return self;
	};

	self.using = function(interceptor) {
		assert(self.proxy, "Please make sure you are intercepting something first");
		self.interceptors.push(interceptor);
		return self;
	};

	var whenProxyCalled = function(invocationName, invocationMethod, args) {
		assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		var thisContext = this;
		var invocation = new Invocation(thisContext, invocationName, invocationMethod, args);
		callEachInterceptor(thisContext,
			invocation,
			function(error, interceptorResults) {
				if (error) throw error;
				invocation.result = invocation.proceed();
				if (interceptorResults.length > 0)
					invocation.result = interceptorResults[interceptorResults.length - 1];
				return invocation.result;
			});
		return invocation.result;
	};

	var callEachInterceptor = function(thisContext, invocation, onAllCalled) {
		enumerable.mapSeries(self.interceptors,
			function(error, nextInterceptor, callback) {
				if (error && numberOfParameters(nextInterceptor) < 3)
					return callback(error);
				if (numberOfParameters(nextInterceptor) === 1)
					return nextInterceptor.call(thisContext, callback);
				if (numberOfParameters(nextInterceptor) === 2)
					return nextInterceptor.call(thisContext, invocation, callback);
				return nextInterceptor.call(thisContext, error, invocation, callback);
			},
			onAllCalled);
	};
};

var numberOfParameters = function(functionWithParameters) {
	if (typeof functionWithParameters !== "function")
		return 0;

	return functionWithParameters.length;
};