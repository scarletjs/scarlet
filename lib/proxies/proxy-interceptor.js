var g = require("../../include");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	g.assert(typeOrInstance);

	g.events.EventEmitter.call(self);

	var ProxyInfo = require("./proxy-info");
	var ProxyProperty = require("./proxy-property");
	var ProxyInstance = require("./proxy-instance");
	var ProxyPrototype = require("./proxy-prototype");

	var self = this;
	self.info = null;
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	self.intercept = function(whenCalledCallback, replaceClassCallback) {
		g.assert(whenCalledCallback);
		self.info = new ProxyInfo(self.typeOrInstance, self.memberName);
		if (self.info.isPrototype()) {
			self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		} else if (self.info.isInstance()) {
			self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		} else if (self.info.isMethod()) {
			self.interceptor = new ProxyMethod(self.info, whenCalledCallback);
		} else if (self.info.isProperty()) {
			self.interceptor = new ProxyProperty(self.info, whenCalledCallback);
		}
		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function() {
		if (!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

g.util.inherits(ProxyInterceptor, g.events.EventEmitter);

module.exports = ProxyInterceptor;