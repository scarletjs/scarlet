var g = require("../../include");

function ProxyMethod(proxyInfo, whenCalled){

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxying.ProxyMethod";

	self.wrap = function(){
		self.proxyInfo.instanceOrType.__scarlet__[self.proxyInfo.memberName] = self.proxyInfo.instanceOrType[self.proxyInfo.memberName];
		self.proxyInfo.instanceOrType[self.proxyInfo.memberName] = function(){
			var args = Array.prototype.slice.call(arguments);
			return self.whenCalled.call(
				self.proxyInfo.instanceOrType, 
				self.proxyInfo, 
				self.proxyInfo.instanceOrType.__scarlet__[self.proxyInfo.memberName], 
				args);
		};
		return self;
	};

	self.unwrap = function(){
		delete proxyInfo.instanceOrType[proxyInfo.memberName];
		proxyInfo.instanceOrType[proxyInfo.memberName] = proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		return self;
	};

}

module.exports = ProxyMethod;