var util = require("util");
var assert = require("assert");
var events = require("events");
var ProxyType = require("./proxy-type");
var ProxyInfo = require("./proxy-info");
var logger = require("../extensions/logger");
var object = require("../extensions/object");
var ProxyMethod = require("./proxy-method");
var ProxyProperty = require("./proxy-property");
var ProxyInstance = require("./proxy-instance");
var ProxyFunction = require("./proxy-function");
var ProxyPrototype = require("./proxy-prototype");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	assert(typeOrInstance);

	events.EventEmitter.call(self);

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

	var interceptMethod = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyMethod(self.info,whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Method", [self.interceptor]);
	};

	var interceptProperty = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyProperty(self.info, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Property", [self.interceptor]);
	};

	var interceptPrototype = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Prototype", [self.interceptor]);
	};

	var interceptFunction = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyFunction(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	self.intercept = function(whenCalledCallback, replaceClassCallback, proxyType) {
		assert(proxyType);
		assert(whenCalledCallback);
		assert(replaceClassCallback);

		self.info = new ProxyInfo(self.typeOrInstance, self.memberName);
		logger.info(ProxyInterceptor, "intercept", "For Type Or Instance", [typeOrInstance, whenCalledCallback, proxyType]);

		if (proxyType.is(proxyType.asPrototype())) {
			interceptPrototype(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asInstance())) {
			interceptInstance(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asMethod())) {
			interceptMethod(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asProperty())) {
			interceptProperty(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asFunction())) {
			interceptFunction(whenCalledCallback, replaceClassCallback);
		}

		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function() {
		if (!object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

util.inherits(ProxyInterceptor, events.EventEmitter);

module.exports = ProxyInterceptor;