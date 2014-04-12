var g = require("../../include");

function ProxyPrototype(type, whenCalled) {

	"use strict";

	g.assert(type);
	g.assert(whenCalled);
	g.assert(type.prototype, "Object prototype may only be an Object or null");

	var ProxyInfo = require("./proxy-info");
	var ProxyInstance = require("./proxy-instance");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";

	var getArguments = function(args) {
		var result = Array.prototype.slice.call(args);
		if (typeof(result) == "undefined")
			return null;
		if (typeof(result) != "undefined" && typeof(result.length) != "undefined" && result.length === 0)
			return null;
		return result;
	};

	var initializeShadow = function(thisContext) {
		thisContext.__scarlet__ = {};
		thisContext.__scarlet__.__proxy__ = new ProxyInstance(thisContext, whenCalled);
		thisContext.__scarlet__.__proxy__.wrap();
	};

	var buildProceed = function(thisContext, callArguments, resultCallback) {
		return function() {
			var callArguments = getArguments(arguments);
			var result = type.apply(thisContext, callArguments);
			if (typeof(result) != "undefined")
				resultCallback(result);
			initializeShadow(thisContext);
			return result;
		};
	};

	var invokeWhenCalled = function(thisContext, proxyInfo, callArguments, resultCallback) {
		var args = callArguments;
		var proceed = buildProceed(thisContext, callArguments, resultCallback);
		proxyInfo.type.isPrototype = true;
		whenCalled.call(
			thisContext,
			proxyInfo,
			proceed,
			args);
	};

	var inheritor = function() {
		var methodResult = null;
		var thisContext = this || {};
		var proxyInfo = new ProxyInfo(type);
		proxyInfo.type.isConstructor = true;
		var callArguments = getArguments(arguments);
		invokeWhenCalled(
			thisContext,
			proxyInfo,
			callArguments,
			function(result) {
				methodResult = result;
			});
		return methodResult;
	};

	self.wrap = function(replaceClassCallback) {
		g.ext.logger.info(ProxyPrototype, "wrap", "Wrapping Prototype", [self]);
		g.util.inherits(inheritor, type);
		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function() {
		return self;
	};
}

module.exports = ProxyPrototype;
