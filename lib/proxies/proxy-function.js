var assert = require('assert');
var ProxyInfo = require('./proxy-info');
var logger = require('../extensions/logger');

function ProxyFunction(actualFunction, whenCalled) {

	"use strict";

	assert(whenCalled);
	assert(actualFunction);

	var self = this;
	self.whenCalled = whenCalled;
	self.actualFunction = actualFunction;
	self.__typename__ = "scarlet.lib.proxies.ProxyFunction";

	self.wrap = function(replaceFunctionCallback) {
		logger.info(ProxyFunction, "wrap", "Wrapping Proxy Function", [actualFunction]);
		
		var proxyInfo = new ProxyInfo(actualFunction);
		var proxiedFunction = function() {
			var args = Array.prototype.slice.call(arguments);
			return self.whenCalled.call(
				this,
				actualFunction,
				args,
				proxyInfo);
		};
		
		proxiedFunction.__scarlet__ = {};
		proxiedFunction.__scarlet__.__function__ = actualFunction;
		
		if (replaceFunctionCallback)
			replaceFunctionCallback(proxiedFunction);
		
		return self;
	};

	self.unwrap = function() {
		return self;
	};

}

module.exports = ProxyFunction;