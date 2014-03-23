var util = require('util');
var assert = require('assert');
var ProxyInfo = require('./proxy-info');
var logger = require('../extensions/logger');
var ProxyInstance = require("./proxy-instance");

function ProxyPrototype(type, whenCalled) {

	"use strict";

	assert(type);
	assert(whenCalled);
	assert(type.prototype, "Object prototype may only be an Object or null");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";

	var getArguments = function(args) {
		var result = Array.prototype.slice.call(args);
		if (typeof(result) == "undefined")
			return null;
		if (typeof(result) != "undefined" && typeof(result.length) != "undefined" && result.length == 0)
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
			if (typeof(result) !== "undefined")
				resultCallback(result);
			initializeShadow(thisContext);
			return result;
		};
	};

	var invokeWhenCalled = function(thisContext, callArguments, resultCallback, proxyInfo) {
		var args = callArguments;
		var proceed = buildProceed(thisContext, callArguments, resultCallback);
		proxyInfo.type.isPrototype = true;
		whenCalled.call(
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
		invokeWhenCalled(
			thisContext,
			callArguments,
			function(result) {
				methodResult = result;
			},
			proxyInfo);
		return methodResult;
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