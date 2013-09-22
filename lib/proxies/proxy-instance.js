var g = require("../../include");

function ProxyInstance(instance, whenCalled){

	"use strict";

	g.assert(instance);
	g.assert(whenCalled);

	var ProxyInfo = require("./proxy-info");
	var ProxyMethod = require("./proxy-method");
	var ProxyProperty = require("./proxy-property");

	var self = this;
	self.instance = instance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	var eachMember = function(callback){
		g.ext.enumerable.forEach(self.instance, function(member, memberName){
			g.assert(memberName);
			if (!g.ext.object.isNull(callback))
				callback(self.instance, memberName);
		});
	};

	self.wrap = function(){
		eachMember(function(instance, memberName){
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.isAllowed()){
				if (proxyInfo.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).wrap();
				} else if (proxyInfo.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).wrap();
				}
			}
		});
		return self;
	};

	self.unwrap = function(){
		eachMember(function(instance, memberName){
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