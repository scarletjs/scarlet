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
		g.ll(" *** ProxyInterceptor::intercept(whenCalledCallback, replaceClassCallback):: ---> *** ");
		var info = new ProxyInfo(self.typeOrInstance, self.memberName);
		g.ll("Before If Statement for Type");
		if (info.isPrototype()) {
			g.ll("Inside IsPrototype");
			self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		} else if (info.isInstance()) {
			g.ll("Inside IsInstance");
			self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		} else if (info.isMethod()) {
			g.ll("Inside IsMethod");
			self.interceptor = new ProxyMethod(info, whenCalledCallback);
		} else if (info.isProperty()) {
			g.ll("Inside IsProperty");
			self.interceptor = new ProxyProperty(info, whenCalledCallback);
		}
		self.interceptor.wrap(replaceClassCallback);
		g.ll(" *** ProxyInterceptor::intercept(whenCalledCallback, replaceClassCallback):: <--- *** ");
	};

	self.release = function() {
		if (!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

module.exports = ProxyInterceptor;