var assert = require("assert");

module.exports = function ProxyMethod(methodThisContext, methodName) {
	"use strict";

	assert(methodName);
	assert(methodThisContext);

	var actualMethod = methodThisContext[methodName];
	this.__typename__ = "scarlet.lib.proxies.ProxyMethod";

	this.wrap = function(whenCalled) {
		assert(whenCalled);
		methodThisContext[methodName] = function() {
			var args = Array.prototype.slice.call(arguments);
			return whenCalled.call(methodThisContext,
				methodName,
				actualMethod,
				args);
		};
		return this;
	};

	this.unwrap = function() {
		methodThisContext[methodName] = actualMethod;
		return this;
	};
};