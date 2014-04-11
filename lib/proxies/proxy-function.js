var assert = require("assert");
var logger = require("../extensions/logger");

module.exports = function ProxyFunction(actualFunction, whenCalled) {

	"use strict";

	assert(whenCalled);
	assert(actualFunction);

	this.__typename__ = "scarlet.lib.proxies.ProxyFunction";

	this.wrap = function(replaceFunctionCallback) {
		logger.info(ProxyFunction, "wrap", "Wrapping Proxy Function", [actualFunction]);
		var proxiedFunction = function() {
			var args = Array.prototype.slice.call(arguments);
			return whenCalled.call(this,
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