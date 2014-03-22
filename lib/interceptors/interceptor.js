var assert = require('assert');
var logger = require('../extensions/logger');
var enumerable = require('../extensions/enumerable');
var series = require('../extensions/series');

function Interceptor() {

	"use strict";

	var ProxyInterceptor = require("../proxies/proxy-interceptor");

	var self = this;
	self.proxy = null;
	self.isSync = false;
	self.interceptors = [];
	self.__typename__ = "scarlet.lib.interceptors.Interceptor";

	var whenProxyCalled = function(info, method, args) {
		assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		var thisContext = this;

		var chained = new enumerable.chained(self.interceptors,function(nextInterceptor){
			if(nextInterceptor)
				nextInterceptor.call(thisContext,info,chained.proceed);
			return method.apply(thisContext,args);
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