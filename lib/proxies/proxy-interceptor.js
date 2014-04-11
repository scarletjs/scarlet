var assert = require("assert");
var ProxyMethod = require("./proxy-method");
var logger = require("../extensions/logger");
var object = require("../extensions/object");
var proxyMetadata = require("./proxy-metadata");
var ProxyProperty = require("./proxy-property");
var ProxyInstance = require("./proxy-instance");
var ProxyFunction = require("./proxy-function");
var ProxyPrototype = require("./proxy-prototype");

module.exports = function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	assert(typeOrInstance);

	var self = this;
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	var interceptInstance = function(whenCalledCallback) {
		self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Instance", [self.interceptor]);
	};

	var interceptPrototype = function(whenCalledCallback) {
		self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Prototype", [self.interceptor]);
	};

	var interceptFunction = function(whenCalledCallback) {
		self.interceptor = new ProxyFunction(self.typeOrInstance, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};
	var interceptMethod = function(whenCalledCallback) {
		self.interceptor = new ProxyMethod(self.typeOrInstance,memberName, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	var interceptProperty = function(whenCalledCallback) {
		self.interceptor = new ProxyProperty(self.typeOrInstance, memberName, whenCalledCallback);
		logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	var setMemberInterceptorType = function(whenCalledCallback){
		if(!memberName) return;

		if(typeof self.typeOrInstance[memberName] === "function")
			return interceptMethod(whenCalledCallback);

		return interceptProperty(whenCalledCallback);
	};
	
	var setInterceptorType = function(whenCalledCallback){
		if(memberName)
			return setMemberInterceptorType(whenCalledCallback);

		if(typeOrInstance.prototype)
			return interceptPrototype(whenCalledCallback);

		if(typeof typeOrInstance === "function")
			return interceptFunction(whenCalledCallback);

		return interceptInstance(whenCalledCallback);
	};

	self.intercept = function(whenCalledCallback, replaceClassCallback) {
		assert(whenCalledCallback);
		assert(replaceClassCallback);

		proxyMetadata(typeOrInstance,memberName).ensureShadow();
		logger.info(ProxyInterceptor, "intercept", "For Type Or Instance", [typeOrInstance, whenCalledCallback]);

		setInterceptorType(whenCalledCallback);
		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function() {
		if (!object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
};