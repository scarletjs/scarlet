var g = require("../../include");

function ProxyType() {

	"use strict";

	var self = this;

	self.UNDEFINED = -1;
	self.INSTANCE = 0;
	self.METHOD = 1;
	self.PROPERTY = 2;
	self.PROTOTYPE = 3;
	self.FUNCTION = 4;

	self.value = self.UNDEFINED;
	self.__typename__ = "scarlet.lib.proxies.ProxyType";

	self.is = function(otherProxyType) {
		return self.value === otherProxyType.value;
	};

	self.asUndefined = function() {
		var newType = new ProxyType();
		newType.value = self.UNDEFINED;
		return newType;
	};

	self.asInstance = function() {
		var newType = new ProxyType();
		newType.value = self.INSTANCE;
		return newType;
	};

	self.asMethod = function() {
		var newType = new ProxyType();
		newType.value = self.METHOD;
		return newType;
	};

	self.asFunction = function() {
		var newType = new ProxyType();
		newType.value = self.FUNCTION;
		return newType;
	};

	self.asProperty = function() {
		var newType = new ProxyType();
		newType.value = self.PROPERTY;
		return newType;
	};

	self.asPrototype = function() {
		var newType = new ProxyType();
		newType.value = self.PROTOTYPE;
		return newType;
	};

	//g.ext.logger.info(ProxyType, ProxyType, "For Proxy Type", [self]);
}

module.exports = ProxyType;