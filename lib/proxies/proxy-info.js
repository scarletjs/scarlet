var g = require("../../include");

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	g.assert(instanceOrType);

	var self = this;
	self.memberName = memberName;
	self.instanceOrType = instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyInfo";

	self.isAllowed = function() {
		var result = memberName != "__scarlet__";
		g.ext.logger.debug(ProxyInfo, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.ensureShadow = function() {
		if (!self.isPrototype() && !g.ext.object.has(self.instanceOrType, "__scarlet__"))
			self.instanceOrType.__scarlet__ = {};
		g.ext.logger.debug(ProxyInfo, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};

	self.isMethod = function() {
		var result = !g.ext.object.isNull(self.instanceOrType) && !g.ext.object.isNull(self.memberName) && !g.ext.object.isNull(self.instanceOrType[memberName]) && g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.isFunction = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.isProperty = function() {
		var result = !g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.isInstance = function() {
		this.isFunction();
		var result = g.ext.object.isNull(memberName) && g.ext.object.isObject(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.isPrototype = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType) && !g.ext.object.isNull(self.instanceOrType.prototype);
		g.ext.logger.info(ProxyInfo, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.hasMember = function() {
		return !g.ext.object.isNull(self.memberName);
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;