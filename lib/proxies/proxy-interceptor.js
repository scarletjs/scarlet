var assert = require("assert");
var ProxyInfo = require("./proxy-info");
var logger = require("../extensions/logger");
var object = require("../extensions/object");
var ProxyInstance = require("./proxy-instance");
var ProxyFunction = require("./proxy-function");
var ProxyPrototype = require("./proxy-prototype");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	assert(typeOrInstance);

	var self = this;
	self.info = null;
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	var interceptInstance = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Instance", [self.interceptor]);
	};

	var interceptPrototype = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Prototype", [self.interceptor]);
	};

	var interceptFunction = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyFunction(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	var setInterceptorType = function(whenCalledCallback, replaceClassCallback){
		if(typeOrInstance.prototype)
			return interceptPrototype(whenCalledCallback, replaceClassCallback);

		if(typeof typeOrInstance === "function")
			return interceptFunction(whenCalledCallback, replaceClassCallback);

		return interceptInstance(whenCalledCallback, replaceClassCallback);
	};

	self.intercept = function(whenCalledCallback, replaceClassCallback) {
		assert(whenCalledCallback);
		assert(replaceClassCallback);

		self.info = new ProxyInfo(self.typeOrInstance, self.memberName);
		logger.info(ProxyInterceptor, "intercept", "For Type Or Instance", [typeOrInstance, whenCalledCallback]);

		setInterceptorType(whenCalledCallback, replaceClassCallback);
		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function() {
		if (!object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

module.exports = ProxyInterceptor;