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

	var whenProxyCalled = function(method, args, proxyInfo) {
		assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		var thisContext = this;
		var invocation = new Invocation(thisContext,method,args,proxyInfo);
		var chained = new enumerable.chained(self.interceptors,function(nextInterceptor){
			if(nextInterceptor)
				nextInterceptor.call(thisContext,chained.proceed,invocation);
			else
				invocation.proceed();
			return invocation.result;
		});
		return chained.proceed();
	};
	
	self.intercept = function(typeOrInstance, replaceTypeCallback, proxyType) {
		assert(proxyType);
		assert(typeOrInstance);
		assert(replaceTypeCallback);
		self.proxy = new ProxyInterceptor(typeOrInstance);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback, proxyType);
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