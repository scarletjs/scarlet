var assert = require('assert');
var object = require('../extensions/object');
var logger = require('../extensions/logger');

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	assert(instanceOrType);

	var self = this;
	self.memberName = memberName;
	self.instanceOrType = instanceOrType;
	self.__isConstructor__ = false;
	self.__typename__ = "scarlet.lib.proxies.ProxyInfo";

	self.isAllowed = function() {
		var result = memberName != "__scarlet__";
		logger.debug(ProxyInfo, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.ensureShadow = function() {
		if (!self.isPrototype() && !object.has(self.instanceOrType, "__scarlet__"))
			self.instanceOrType.__scarlet__ = {};
		logger.debug(ProxyInfo, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};

	self.isConstructor = function(){
		return self.__isConstructor__;
	};

	self.isMethod = function() {
		var result = !object.isNull(self.instanceOrType) && !object.isNull(self.memberName) && !object.isNull(self.instanceOrType[memberName]) && object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.isFunction = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType);
		logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.isProperty = function() {
		var result = !object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.isInstance = function() {
		this.isFunction();
		var result = object.isNull(memberName) && object.isObject(self.instanceOrType);
		logger.info(ProxyInfo, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.isPrototype = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType) && !object.isNull(self.instanceOrType.prototype);
		logger.info(ProxyInfo, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.hasMember = function() {
		return !object.isNull(self.memberName);
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;