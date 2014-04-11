var util = require("util");
var assert = require("assert");
var logger = require("../extensions/logger");
var proxyMetadata = require("./proxy-metadata");
var proxyInstance = require("./proxy-instance");
var enumerable = require("../extensions/enumerable");
var object = require("../extensions/Object");

module.exports = function ProxyPrototype(type, whenCalled) {

	"use strict";

	assert(type);
	assert(whenCalled);
	assert(type.prototype, "Object prototype may only be an Object or null");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";

	self.wrap = function(replaceClassCallback) {
		logger.info(ProxyPrototype, "wrap", "Wrapping Prototype", [self]);
		util.inherits(inheritor, type);
		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function() {
		return type;
	};
	
	var inheritor = function() {
		var methodResult = null;
		var thisContext = this || {};
		var callArguments = Array.prototype.slice.call(arguments);
		return invokeWhenCalled(
				thisContext,
				callArguments);
	};

	var invokeWhenCalled = function(thisContext, callArguments) {
		var args = callArguments;
		var proceed = buildProceed(thisContext);
		return whenCalled.call(
					thisContext,
					proceed,
					args);
	};

	var buildProceed = function(thisContext) {
		return function() {
			var callArguments = Array.prototype.slice.call(arguments);
			var result = type.apply(thisContext, callArguments);
			initializeShadow(thisContext);
			return result;
		};
	};

	var initializeShadow = function(thisContext) {
		if(proxyMetadata(thisContext).hasShadow())
			return;

		proxyMetadata(thisContext).ensureShadow();
		if(!object.objectHasFunction(thisContext,inheritor))
			proxyInstance(thisContext,whenCalled).wrap();
	};
};