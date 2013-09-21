var g = require("../../include");

function ProxyMethod(proxyInfo, whenCalled){

	"use strict";

	g.assert(proxyInfo, "Cannot have null proxyInfo");
	g.assert(whenCalled, "Cannot have null whenCalled callback");

	var self = this;
	self.proxyInfo = proxyInfo;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxying.ProxyMethod";

	self.wrap = function(){
		self.proxyInfo.instance.__scarlet[self.proxyInfo.memberName] = self.proxyInfo.instance[self.proxyInfo.memberName];
		self.proxyInfo.instance[self.proxyInfo.memberName] = function(){
			var args = Array.prototype.slice.call(arguments);
			return self.whenCalled.call(
				self.proxyInfo.instance, 
				self.proxyInfo, 
				self.proxyInfo.instance.__scarlet[self.proxyInfo.memberName], 
				args);
		};
		return self;
	};

	self.unwrap = function(){
		delete proxyInfo.instance[proxyInfo.memberName];
		proxyInfo.instance[proxyInfo.memberName] = proxyInfo.instance.__scarlet[proxyInfo.memberName];
		return self;
	};

}

module.exports = ProxyMethod;