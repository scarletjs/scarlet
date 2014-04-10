var util = require("util");
var assert = require("assert");
var ProxyInfo = require("./proxy-info");
var logger = require("../extensions/logger");
var ProxyInstance = require("./proxy-instance");
var enumerable = require("../extensions/enumerable");

function ProxyPrototype(type, whenCalled) {

	"use strict";

	assert(type);
	assert(whenCalled);
	assert(type.prototype, "Object prototype may only be an Object or null");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";
	var originalType = type;

	var getArguments = function(args) {
		var result = Array.prototype.slice.call(args);
		if (typeof(result) === "undefined")
			return null;
		if (typeof(result) !== "undefined" && typeof(result.length) !== "undefined" && result.length === 0)
			return null;
		return result;
	};

	var isMemberProxied = function(thisContext){
		for(var x in thisContext){
			if(thisContext[x] == inheritor)
				return true;
		}
		return false;
	};

	var initializeShadow = function(thisContext) {
		if(thisContext.__scarlet__)
			return;

		thisContext.__scarlet__ = {};

		if(isMemberProxied(thisContext))
			return;
		
		thisContext.__scarlet__.__proxy__ = new ProxyInstance(thisContext, whenCalled);
		thisContext.__scarlet__.__proxy__.wrap();
	};

	var buildProceed = function(thisContext) {
		return function() {
			var callArguments = getArguments(arguments);
			var result = type.apply(thisContext, callArguments);
			initializeShadow(thisContext);
			return result;
		};
	};

	var invokeWhenCalled = function(thisContext, callArguments, proxyInfo) {
		var args = callArguments;
		var proceed = buildProceed(thisContext);
		proxyInfo.type.isPrototype = true;
		return whenCalled.call(
					thisContext,
					proceed,
					args,
					proxyInfo);
	};

	var inheritor = function() {
		var methodResult = null;
		var thisContext = this || {};
		var proxyInfo = new ProxyInfo(type);
		proxyInfo.type.isConstructor = true;
		var callArguments = getArguments(arguments);
		return invokeWhenCalled(
				thisContext,
				callArguments,
				proxyInfo);
	};

	self.wrap = function(replaceClassCallback) {
		logger.info(ProxyPrototype, "wrap", "Wrapping Prototype", [self]);
		util.inherits(inheritor, type);
		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function() {
		return self;
	};
}

module.exports = ProxyPrototype;