var g = require("../../include");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	g.assert(typeOrInstance);

	g.events.EventEmitter.call(self);

	var ProxyType = require("./proxy-type");
	var ProxyInfo = require("./proxy-info");
	var ProxyMethod = require("./proxy-method");
	var ProxyProperty = require("./proxy-property");
	var ProxyInstance = require("./proxy-instance");
	var ProxyFunction = require("./proxy-function");
	var ProxyPrototype = require("./proxy-prototype");

	var self = this;
	self.info = null;
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	var interceptInstance = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Instance", [self.interceptor]);
	};

	var interceptMethod = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyMethod(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Method", [self.interceptor]);
	};

	var interceptProperty = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyProperty(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Property", [self.interceptor]);
	};

	var interceptPrototype = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Prototype", [self.interceptor]);
	};

	var interceptFunction = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyFunction(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	self.intercept = function(whenCalledCallback, replaceClassCallback, proxyType) {
		g.assert(proxyType);
		g.assert(whenCalledCallback);
		g.assert(replaceClassCallback);

		self.info = new ProxyInfo(self.typeOrInstance, self.memberName);
		g.ext.logger.info(ProxyInterceptor, "intercept", "For Type Or Instance", [typeOrInstance, whenCalledCallback, proxyType]);

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
		if (!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

g.util.inherits(ProxyInterceptor, g.events.EventEmitter);

module.exports = ProxyInterceptor;
