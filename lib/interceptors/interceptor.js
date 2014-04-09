var assert = require("assert");
var Invocation = require("./invocation");
var logger = require("../extensions/logger");
var enumerable = require("../extensions/enumerable");
var ProxyInterceptor = require("../proxies/proxy-interceptor");

function Interceptor() {

	"use strict";

	var self = this;
	self.proxy = null;
	self.isSync = false;
	self.interceptors = [];
	self.__typename__ = "scarlet.lib.interceptors.Interceptor";

	var callEachInterceptor = function(thisContext, invocation, onAllCalled){
		enumerable.mapSeries(self.interceptors, function(error, nextInterceptor, callback){
			if (error && nextInterceptor.length < 3)
				return callback(error);

			if(nextInterceptor.length <= 1)
				return nextInterceptor.call(thisContext,callback);
			if(nextInterceptor.length === 2)
				return nextInterceptor.call(thisContext,invocation,callback);
			if(nextInterceptor.length >= 3)
				return nextInterceptor.call(thisContext,error,invocation,callback);
		}, onAllCalled);
	};

	var whenProxyCalled = function(method, args, proxyInfo) {
		assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		var thisContext = this;
		var invocation = new Invocation(thisContext,method,args,proxyInfo);
		callEachInterceptor(thisContext, invocation, function(error, results){
			if(error)
				throw error;
			invocation.proceed();
			if(results.length > 0)
				invocation.result = results[results.length-1];
			return invocation.result;
		});
		return invocation.result;
	};
	
	self.intercept = function(typeOrInstance, memberName,replaceTypeCallback) {
		assert(typeOrInstance);
		assert(replaceTypeCallback);
		self.proxy = new ProxyInterceptor(typeOrInstance,memberName);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback);
		logger.info(Interceptor, "intercept", "For Type or Instance", [typeOrInstance]);
		return self;
	};

	self.using = function(whenCalled) {
		assert(self.proxy, "Please make sure you are intercepting something first");
		self.interceptors.push(whenCalled);
		logger.info(Interceptor, "using", "Using Interceptor", [whenCalled]);
		return self;
	};
}

module.exports = Interceptor;