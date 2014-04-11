var assert = require("assert");

module.exports = function ProxyProperty(properyThisContext,propertyName,whenCalled) {

	"use strict";

	assert(whenCalled);
	assert(propertyName);
	assert(properyThisContext);

	var actualValue = properyThisContext[propertyName];
	this.__typename__ = "scarlet.lib.proxies.ProxyProperty";

	this.wrap = function() {	
		Object.defineProperty(
			properyThisContext, 
			propertyName, 
			{
				get: function() {return invokeWhenCalledForGet();},
				set: function(value) {invokeWhenCalledForSet(value);}
			});
		return this;
	};

	var invokeWhenCalledForGet = function() {
		return whenCalled.call(
					properyThisContext,
					function() { return actualValue;},
					null,
					propertyName);
	};

	var invokeWhenCalledForSet = function(value) {	
		return whenCalled.call(
					properyThisContext,
					function() { actualValue = value;},
					null,
					propertyName);
	};

	this.unwrap = function() {
		delete properyThisContext[propertyName];
		properyThisContext[propertyName] = actualValue;
		return this;
	};
};