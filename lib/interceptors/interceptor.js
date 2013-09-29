var g = require("../../include");

function Interceptor() {

	"use strict";

	var ProxyInterceptor = require("../proxies/proxy-interceptor");

	var self = this;
	self.proxy = null;
	self.interceptors = [];
	self.__typename__ = "scarlet.lib.interceptors.Interceptor";

	var getConcreteMethod = function(thisContext, concreteMethod) {
		return function(info, ignoreThisMethod, args) {
			return concreteMethod.apply(thisContext, args);
		};
	};

	var getInterceptorMethod = function(callback, interceptor, thisContext) {
		return function(info, ignoreThisMethod, args) {
			return interceptor.call(thisContext, info, callback, args);
		};
	};

	var createCallback = function(interceptor, callback, thisContext, concreteMethod) {
		if (callback == null && interceptor == null) {
			return getConcreteMethod(thisContext, concreteMethod);
		} else {
			return getInterceptorMethod(callback, interceptor, thisContext);
		}
	};

	var whenProxyCalled = function(info, method, args) {
		g.assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		
		var thisContext = this;
		var previousCallback = null;
		var previousInterceptor = null;
		
		g.ext.enumerable.forEach(self.interceptors, function(interceptor, index) {
			previousCallback = createCallback(previousInterceptor, previousCallback, thisContext, method);
			previousInterceptor = interceptor;
		});
		
		return previousInterceptor.call(thisContext, info, previousCallback, args);
	};

	self.intercept = function(typeOrInstance, replaceTypeCallback) {
		self.proxy = new ProxyInterceptor(typeOrInstance);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback);
		return self;
	};

	self.using = function(whenCalled) {
		g.assert(self.proxy, "Please make sure you are intercepting something first");
		self.interceptors.push(whenCalled);
		return self;
	};
}

module.exports = Interceptor;