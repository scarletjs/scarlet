var g = require("../../include");

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	g.assert(instanceOrType);

	var self = this;
	self.__isMethod__ = false;
	self.__isFunction__ = false;
	self.__isProperty__ = false;
	self.__isPrototype__ = false;
	self.__isConstructor__ = false;
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

	self.isConstructor = function(){
		return self.__isConstructor__;
	};

	self.setIsConstructor = function(value) {
		self.__isConstructor__ = value;
	};

	self.getIsConstructor = function(){
		return self.__isConstructor__;
	};

	self.isMethod = function() {
		var result = !g.ext.object.isNull(self.instanceOrType) && !g.ext.object.isNull(self.memberName) && !g.ext.object.isNull(self.instanceOrType[memberName]) && g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.setIsMethod = function(value) {
		self.__isMethod__ = value;
	};

	self.getIsMethod = function(){
		return self.__isMethod__;
	}

	self.isFunction = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.setIsFunction = function(value) {
		self.__isFunction__ = value;
	};

	self.getIsFunction = function(){
		return self.__isFunction__;
	};

	self.isProperty = function() {
		var result = !g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.setIsProperty = function(value) {
		self.__isProperty__ = value;
	};

	self.getIsProperty = function(){
		return self.__isProperty__;
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

	self.setIsPrototype = function(value){
		self.__isPrototype__ = value;
	};

	self.getIsPrototype = function(){
		return self.__isPrototype__;
	};

	self.hasMember = function() {
		return !g.ext.object.isNull(self.memberName);
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;
