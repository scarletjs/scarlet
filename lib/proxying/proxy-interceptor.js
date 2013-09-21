var g = require("../../include");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	g.assert(typeOrInstance);

	var ProxyInfo = require("./proxy-info");
	var ProxyProperty = require("./proxy-property");
	var ProxyInstance = require("./proxy-instance");
	var ProxyPrototype = require("./proxy-prototype");

	var self = this; 
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxying.ProxyInterceptor";

	self.intercept = function(whenCalledCallback, replaceClassCallback) {
		g.assert(whenCalledCallback);
		var info = new ProxyInfo(self.typeOrInstance, self.memberName);
		if(info.isPrototype())
			self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		else if(info.isInstance())
			self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		else if(info.isMethod())
			self.interceptor = new ProxyMethod(info, whenCalledCallback);
		else if(info.isProperty())
			self.interceptor = new ProxyProperty(info, whenCalledCallback);
		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function(){
		if(!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

module.exports = ProxyInterceptor;