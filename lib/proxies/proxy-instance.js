var assert = require("assert");
var inspect = require("util").inspect;
var ProxyInfo = require("./proxy-info");
var ProxyMethod = require("./proxy-method");
var object = require("../extensions/object");
var logger = require("../extensions/logger");
var ProxyProperty = require("./proxy-property");
var enumerable = require("../extensions/enumerable");

module.exports = function ProxyInstance(instance, whenCalled) {
	"use strict";

	assert(instance);
	assert(whenCalled);
	var self = this;
	self.instance = instance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	var anyMembers = function() {
		var count = 0;
		enumerable.forEach(self.instance, function(member, memberName) {
			count += 1;
		});
		return count !== 0;
	};

	var eachMember = function(callback) {
		logger.info(eachMember, eachMember, "For Each Member", [self.instance]);
		enumerable.forEach(self.instance, function(member, memberName) {
			assert(memberName);
			logger.info(eachMember, eachMember, "For Each Member::Current=" + inspect(member) + " -> " + memberName + "", [self.instance]);
			if (!object.isNull(callback))
				callback(self.instance, memberName);
		});
	};

	self.wrap = function() {
		logger.info(ProxyInstance, "wrap", "Wrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.reflection.isAllowed()) {
				if (proxyInfo.reflection.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).wrap();
				} else if (proxyInfo.reflection.isProperty()) {
					new ProxyProperty(proxyInfo,whenCalled).wrap();
				}
			}
		});
		return self;
	};

	self.unwrap = function() {
		logger.info(ProxyInstance, "unwrap", "Unwrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.reflection.isAllowed()) {
				if (proxyInfo.reflection.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).unwrap();
				} else if (proxyInfo.reflection.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).unwrap();
				}
			}
		});
		return self;
	};
};