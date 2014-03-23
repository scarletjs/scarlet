var assert = require('assert');
var ProxyInfo = require('./proxy-info');

function ProxyMethod(proxyInfo, whenCalled) {

	"use strict";

	assert(whenCalled);

	var self = this;
	self.whenCalled = whenCalled;
	var methodName = proxyInfo.memberName;
	var methodThisContext = proxyInfo.instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyMethod";

	self.wrap = function() {
		var actualMethod = methodThisContext[methodName];
		methodThisContext.__scarlet__[methodName] = actualMethod;
		var proxyInfo = new ProxyInfo(methodThisContext,methodName);
		methodThisContext[methodName] = function() {
			var args = Array.prototype.slice.call(arguments);
			self.proxyInfo.type.isMethod = true;
			return self.whenCalled.call(
				methodThisContext,
				actualMethod,
				args,
				proxyInfo);
		};
		return self;
	};

	self.unwrap = function() {
		methodThisContext[methodName] = methodThisContext.__scarlet__[methodName];
		return self;
	};

}

module.exports = ProxyMethod;
