var assert = require("assert");
var object = require("../extensions/object");
var logger = require("../extensions/logger");

module.exports = function ProxyMetadata(instanceOrType, memberName) {
	"use strict";

	if (!(this instanceof ProxyMetadata))
        return new ProxyMetadata(instanceOrType,memberName);

	assert(instanceOrType);

	var self = this;

	self.type = {
		isMethod: false,
		isFunction: false,
		isProperty: false,
		isPrototype: false,
		isConstructor: false,
		isPropertyGetter: false,
		isPropertySetter: false
	};

	self.memberName = memberName;
	self.instanceOrType = instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyMetadata";
	self.reflection ={};

	self.hasShadow = function(){
		return object.has(self.instanceOrType, "__scarlet__");
	};
	self.ensureShadow = function() {
		if (!self.hasShadow())
			self.instanceOrType.__scarlet__ = {};

		logger.debug(ProxyMetadata, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};
	
	self.reflection.isAllowed = function() {
		var result = self.memberName != "__scarlet__";
		logger.debug(ProxyMetadata, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.reflection.isMethod = function() {
		var result = !object.isNull(self.instanceOrType) && !object.isNull(self.memberName) && !object.isNull(self.instanceOrType[memberName]) && object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyMetadata, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.reflection.isFunction = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType);
		logger.info(ProxyMetadata, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.reflection.isProperty = function() {
		var result = !object.isFunction(self.instanceOrType[self.memberName]);
		logger.info(ProxyMetadata, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.reflection.isInstance = function() {
		this.isFunction();
		var result = object.isNull(memberName) && object.isObject(self.instanceOrType);
		logger.info(ProxyMetadata, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.reflection.isPrototype = function() {
		var result = object.isNull(memberName) && object.isFunction(self.instanceOrType) && !object.isNull(self.instanceOrType.prototype);
		logger.info(ProxyMetadata, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.reflection.hasMember = function() {
		return !object.isNull(self.memberName);
	};

	return this;
};
