var assert = require("assert");

module.exports = function ProxyProperty(properyThisContext, propertyName) {
	"use strict";

	assert(propertyName);
	assert(properyThisContext);

	var actualValue = properyThisContext[propertyName];
	this.__typename__ = "scarlet.lib.proxies.ProxyProperty";

	this.wrap = function(whenCalled) {
		assert(whenCalled);
		Object.defineProperty(
			properyThisContext,
			propertyName, {
				get: function() {
					return invokeWhenCalledForGet(whenCalled);
				},
				set: function(value) {
					invokeWhenCalledForSet(whenCalled, value);
				}
			});
		return this;
	};

	var invokeWhenCalledForGet = function(whenCalled) {
		return whenCalled.call(properyThisContext,
			propertyName,
			function() {
				return actualValue;
			});
	};

	var invokeWhenCalledForSet = function(whenCalled, value) {
		return whenCalled.call(
			properyThisContext,
			propertyName,
			function() {
				actualValue = value;
			});
	};

	this.unwrap = function() {
		delete properyThisContext[propertyName];
		properyThisContext[propertyName] = actualValue;
		return this;
	};
};