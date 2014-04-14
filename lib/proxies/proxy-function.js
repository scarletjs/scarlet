var assert = require("assert");

module.exports = function ProxyFunction(actualFunction) {
	"use strict";

	assert(actualFunction);
	this.__typename__ = "scarlet.lib.proxies.ProxyFunction";

	this.wrap = function(whenCalled, replaceFunctionCallback) {
		assert(whenCalled);

		var proxiedFunction = function() {
			var args = Array.prototype.slice.call(arguments);
			return whenCalled.call(this,
				actualFunction.name,
				actualFunction,
				args);
		};

		if (replaceFunctionCallback)
			replaceFunctionCallback(proxiedFunction);

		return this;
	};

	this.unwrap = function() {
		return actualFunction;
	};

};