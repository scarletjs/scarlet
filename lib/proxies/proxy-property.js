var g = require("../../include");

function ProxyProperty(proxyInfo, whenCalled) {

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.__typename__ = "scarlet.lib.proxies.ProxyProperty";

	var invokeWhenCalledForGet = function() {
		self.proxyInfo.type.isProperty = true;
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function() {
			return proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		}, [proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName]]);
	};

	var invokeWhenCalledForSet = function(value) {
		self.proxyInfo.type.isProperty = true;
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function() {
			proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName] = value;
		}, [proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName], value]);
	};

	self.wrap = function() {
		proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName] = proxyInfo.instanceOrType[proxyInfo.memberName];
		Object.defineProperty(
			proxyInfo.instanceOrType, proxyInfo.memberName, {
				get: function() {
					return invokeWhenCalledForGet();
				},
				set: function(value) {
					invokeWhenCalledForSet(value);
				}
			});
		return self;
	};

	self.unwrap = function() {
		delete proxyInfo.instanceOrType[proxyInfo.memberName];
		proxyInfo.instanceOrType[proxyInfo.memberName] = proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		delete proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		return self;
	};
}

module.exports = ProxyProperty;
