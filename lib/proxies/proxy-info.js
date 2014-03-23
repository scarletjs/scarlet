var assert = require('assert');
var object = require('../extensions/object');
var logger = require('../extensions/logger');

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	assert(instanceOrType);

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
		logger.debug(ProxyInfo, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.reflection.ensureShadow = function() {
		if (!self.reflection.isPrototype() && !object.has(self.instanceOrType, "__scarlet__"))
			self.instanceOrType.__scarlet__ = {};
		logger.debug(ProxyInfo, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};

	self.reflection.isMethod = function() {
		var result = !object.isNull(self.instanceOrType) && !object.isNull(self.memberName) && !object.isNull(self.instanceOrType[memberName]) && object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.reflection.isFunction = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType);
		logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.reflection.isProperty = function() {
		var result = !object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.reflection.isInstance = function() {
		this.isFunction();
		var result = object.isNull(memberName) && object.isObject(self.instanceOrType);
		logger.info(ProxyInfo, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.reflection.isPrototype = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType) && !object.isNull(self.instanceOrType.prototype);
		logger.info(ProxyInfo, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.reflection.hasMember = function() {
		return !object.isNull(self.memberName);
	};

	self.reflection.ensureShadow();
}

module.exports = ProxyInfo;
