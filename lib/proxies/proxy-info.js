var g = require("../../include");

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	g.assert(instanceOrType);

	var self = this;

	self.type = {
		isMethod: false,
		isFunction: false,
		isProperty: false,
		isPrototype: false,
		isConstructor: false
	};

	self.memberName = memberName;
	self.instanceOrType = instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyInfo";

	self.reflection = {};

	self.reflection.isAllowed = function() {
		var result = self.memberName != "__scarlet__";
		g.ext.logger.debug(ProxyInfo, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.reflection.ensureShadow = function() {
		if (!self.reflection.isPrototype() && !g.ext.object.has(self.instanceOrType, "__scarlet__"))
			self.instanceOrType.__scarlet__ = {};
		g.ext.logger.debug(ProxyInfo, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};

	self.reflection.isMethod = function() {
		var result = !g.ext.object.isNull(self.instanceOrType) && !g.ext.object.isNull(self.memberName) && !g.ext.object.isNull(self.instanceOrType[memberName]) && g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.reflection.isFunction = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.reflection.isProperty = function() {
		var result = !g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.reflection.isInstance = function() {
		this.isFunction();
		var result = g.ext.object.isNull(memberName) && g.ext.object.isObject(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.reflection.isPrototype = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType) && !g.ext.object.isNull(self.instanceOrType.prototype);
		g.ext.logger.info(ProxyInfo, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.reflection.hasMember = function() {
		return !g.ext.object.isNull(self.memberName);
	};

	self.reflection.ensureShadow();
}

module.exports = ProxyInfo;
