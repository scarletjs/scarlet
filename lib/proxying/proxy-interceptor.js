var g = require("../../include");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	var ProxyInfo = require("./proxy-info");
	var ProxyProperty = require("./proxy-property");
	var ProxyInstance = require("./proxy-instance");
	var ProxyPrototype = require("./proxy-prototype");

	var self = this; 
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;

	self.intercept = function(whenCalledCallback, replaceClassCallback) {
		g.assert(whenCalledCallback);
		var info = new ProxyInfo(self.typeOrInstance, self.memberName);
		if(info.isPrototype())
			self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		if(info.isInstance())
			self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		if(info.isMethod())
			self.interceptor = new ProxyMethod(info, whenCalledCallback);
		if(info.isProperty())
			self.interceptor = new ProxyProperty(info, whenCalledCallback);
		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function(){
		if(!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}