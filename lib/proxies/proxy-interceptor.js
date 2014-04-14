var assert = require("assert");
var ProxyMethod = require("./proxy-method");
var proxyMetadata = require("./proxy-metadata");
var ProxyProperty = require("./proxy-property");
var ProxyInstance = require("./proxy-instance");
var ProxyFunction = require("./proxy-function");
var ProxyPrototype = require("./proxy-prototype");

module.exports = function ProxyInterceptor(typeOrInstance, memberName) {
	"use strict";

	assert(typeOrInstance);

	this.proxy = null;
	this.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	this.intercept = function(whenCalledCallback, replaceClassCallback) {
		assert(whenCalledCallback);
		assert(replaceClassCallback);

		proxyMetadata(typeOrInstance, memberName).ensureShadow();
		this.proxy = proxyForTypeOrInstance().wrap(whenCalledCallback, replaceClassCallback);
	};

	this.release = function() {
		if (this.proxy)
			this.proxy.unwrap();
	};

	var proxyForTypeOrInstance = function() {
		if (memberName)
			return proxyForMember();
		if (typeOrInstance.prototype)
			return new ProxyPrototype(typeOrInstance);
		if (typeof typeOrInstance === "function")
			return new ProxyFunction(typeOrInstance);
		return new ProxyInstance(typeOrInstance);
	};

	var proxyForMember = function() {
		if (!memberName) return;

		if (typeof typeOrInstance[memberName] === "function")
			return new ProxyMethod(typeOrInstance, memberName);

		return new ProxyProperty(typeOrInstance, memberName);
	};
};