var util = require("util");
var assert = require("assert");
var object = require("../extensions/object");
var proxyMetadata = require("./proxy-metadata");
var proxyInstance = require("./proxy-instance");
var enumerable = require("../extensions/enumerable");

module.exports = function ProxyPrototype(type) {
	"use strict";

	assert(type);
	assert(type.prototype);

	var self = this;
	self.whenCalled = null;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";

	self.wrap = function(whenCalled, replaceClassCallback) {
		assert(whenCalled);
		self.whenCalled = whenCalled;
		util.inherits(inheritor, type);

		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function() {
		return type;
	};

	var inheritor = function() {
		var thisContext = this || {};
		var callArguments = Array.prototype.slice.call(arguments);
		var proceed = buildProceed(thisContext);
		return self.whenCalled.call(
			type.name,
			thisContext,
			proceed,
			callArguments);
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
		if (proxyMetadata(thisContext).hasShadow())
			return;

		proxyMetadata(thisContext).ensureShadow();
		if (!object.objectHasFunction(thisContext, inheritor))
			proxyInstance(thisContext).wrap(self.whenCalled);
	};
};