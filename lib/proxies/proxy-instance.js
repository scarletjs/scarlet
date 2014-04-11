var assert = require("assert");
var ProxyMethod = require("./proxy-method");
var object = require("../extensions/object");
var logger = require("../extensions/logger");
var ProxyMetadata = require("./proxy-metadata");
var ProxyProperty = require("./proxy-property");
var enumerable = require("../extensions/enumerable");

module.exports = function ProxyInstance(instance, whenCalled) {
	"use strict";
	
	if (!(this instanceof ProxyInstance))
        return new ProxyInstance(instance,whenCalled);

	assert(instance);
	assert(whenCalled);
	
	var proxies = [];
	this.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	this.wrap = function() {
		logger.info(ProxyInstance, "wrap", "Wrapping Instance", [instance]);
		proxyEachInstanceMember(instance,function(proxy){
			proxy.wrap();
			proxies.push(proxy);
		});
		return this;
	};

	this.unwrap = function() {
		logger.info(ProxyInstance, "unwrap", "Unwrapping Instance", [instance]);
		enumerable.forEach(proxies,function(proxy){
			proxy.unwrap();
		});
		return this;
	};

	var proxyEachInstanceMember = function(instanceToProxy,onEach){
		if(!onEach) return;
		enumerable.forEach(instanceToProxy, function(member, memberName) {
			assert(memberName);

			var proxyMetadata = new ProxyMetadata(instanceToProxy, memberName).ensureShadow();
			if(!proxyMetadata.reflection.isAllowed()) return;

			if(proxyMetadata.reflection.isMethod())
				return onEach(new ProxyMethod(instanceToProxy, memberName, whenCalled));

			if(proxyMetadata.reflection.isProperty())
				return onEach(new ProxyProperty(instanceToProxy, memberName,whenCalled));
		});
	};
};