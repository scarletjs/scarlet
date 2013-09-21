var g = require("../../include");

function ProxyProperty(proxyInfo, whenCalled){

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.__typename__ = "scarlet.lib.proxying.ProxyProperty";

	self.invokeWhenCalledForGet = function(){
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function(){
			return proxyInfo.instanceOrType.__scarlet[proxyInfo.memberName];
		});
	};

	self.invokeWhenCalledForSet = function(value){
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function(){
			proxyInfo.instanceOrType.__scarlet[proxyInfo.memberName] = value;
		});
	};

	self.wrap = function(){
		proxyInfo.instanceOrType.__scarlet[proxyInfo.memberName] = proxyInfo.instanceOrType[proxyInfo.memberName];
		Object.defineProperty(
			proxyInfo.instanceOrType, proxyInfo.memberName, {
				get: function(){
					return self.invokeWhenCalledForGet();
				},
				set: function(value){
					self.invokeWhenCalledForSet(value);
				}
			});
		return self;
	};

	self.unwrap = function(){
		delete proxyInfo.instanceOrType[proxyInfo.memberName];
		proxyInfo.instanceOrType[proxyInfo.memberName] = proxyInfo.instanceOrType.__scarlet[proxyInfo.memberName];
		delete proxyInfo.instanceOrType.__scarlet[proxyInfo.memberName];
		return self;
	};
}

module.exports = ProxyProperty;