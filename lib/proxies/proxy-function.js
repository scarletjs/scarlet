var g = require("../../include");

function ProxyFunction(proxyInfo, whenCalled) {

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyFunction";

	self.wrap = function(replaceFunctionCallback) {
		g.ext.logger.info(ProxyFunction, "wrap", "Wrapping Proxy Function", [self.proxyInfo]);
		
		var actualFunction = self.proxyInfo.instanceOrType;
		var proxiedFunction = function() {
			var args = Array.prototype.slice.call(arguments);
			return self.whenCalled.call(
				self.proxyInfo.instanceOrType,
				self.proxyInfo,
				actualFunction,
				args);
		};
		
		proxiedFunction.__scarlet__ = {};
		proxiedFunction.__scarlet__.__function__ = actualFunction;
		self.proxyInfo.instanceOrType = proxiedFunction;
		
		if (replaceFunctionCallback)
			replaceFunctionCallback(proxiedFunction);
		
		return self;
	};

	self.unwrap = function() {
		return self;
	};

}

module.exports = ProxyFunction;