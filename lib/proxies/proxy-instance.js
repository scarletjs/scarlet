var assert = require("assert");
var ProxyMethod = require("./proxy-method");
var ProxyMetadata = require("./proxy-metadata");
var ProxyProperty = require("./proxy-property");
var enumerable = require("../extensions/enumerable");

module.exports = function ProxyInstance(instance) {
	"use strict";

	if (!(this instanceof ProxyInstance))
		return new ProxyInstance(instance);

	assert(instance);

	var proxies = [];
	this.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	this.wrap = function(whenCalled) {
		assert(whenCalled);
		proxyEachInstanceMember(instance, function(proxy) {
			proxy.wrap(whenCalled);
			proxies.push(proxy);
		});
		return this;
	};

	this.unwrap = function() {
		enumerable.forEach(proxies, function(proxy) {
			proxy.unwrap();
		});
		return this;
	};

	var proxyEachInstanceMember = function(instanceToProxy, onEach) {
		if (!onEach) return;
		enumerable.forEach(instanceToProxy, function(member, memberName) {
			assert(memberName);

			var proxyMetadata = new ProxyMetadata(instanceToProxy, memberName).ensureShadow();
			if (!proxyMetadata.reflection.isAllowed()) return;

			if (proxyMetadata.reflection.isMethod())
				return onEach(new ProxyMethod(instanceToProxy, memberName));

			if (proxyMetadata.reflection.isProperty())
				return onEach(new ProxyProperty(instanceToProxy, memberName));
		});
	};
};