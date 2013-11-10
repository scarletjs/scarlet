var g = require("../../include");

function ProxyInstance(instance, whenCalled) {

	"use strict";

	g.assert(instance);
	g.assert(whenCalled);

	var ProxyInfo = require("./proxy-info");
	var ProxyMethod = require("./proxy-method");
	var ProxyProperty = require("./proxy-property");

	var self = this;
	self.instance = instance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	var anyMembers = function() {
		var count = 0;
		g.ext.enumerable.forEach(self.instance, function(member, memberName) {
			count += 1;
		});
		return count != 0;
	};

	var eachMember = function(callback) {
		g.ext.logger.info(eachMember, eachMember, "For Each Member", [self.instance]);
		g.ext.enumerable.forEach(self.instance, function(member, memberName) {
			g.assert(memberName);
			g.ext.logger.info(eachMember, eachMember, "For Each Member::Current=" + g.i(member) + " -> " + memberName + "", [self.instance]);
			if (!g.ext.object.isNull(callback))
				callback(self.instance, memberName);
		});
	};

	self.wrap = function() {
		g.ext.logger.info(ProxyInstance, "wrap", "Wrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.isAllowed()) {
				if (proxyInfo.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).wrap();
				} else if (proxyInfo.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).wrap();
				}
			}
		});
		return self;
	};

	self.unwrap = function() {
		g.ext.logger.info(ProxyInstance, "unwrap", "Unwrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.isAllowed()) {
				if (proxyInfo.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).unwrap();
				} else if (proxyInfo.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).unwrap();
				}
			}
		});
		return self;
	};
}

module.exports = ProxyInstance;