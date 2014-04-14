var assert = require("assert");
var object = require("../extensions/object");
var logger = require("../extensions/logger");

module.exports = function ProxyMetadata(instanceOrType, memberName) {
	"use strict";

	if (!(this instanceof ProxyMetadata))
		return new ProxyMetadata(instanceOrType, memberName);

	assert(instanceOrType);

	this.__typename__ = "scarlet.lib.proxies.ProxyMetadata";
	this.reflection = {};

	this.hasShadow = function() {
		return object.has(instanceOrType, "__scarlet__");
	};
	this.ensureShadow = function() {
		if (!this.hasShadow())
			instanceOrType.__scarlet__ = {};

		logger.debug(ProxyMetadata, "ensureShadow", "Shadow Object Created", [instanceOrType]);
		return this;
	};

	this.reflection.isAllowed = function() {
		var result = memberName != "__scarlet__";
		logger.debug(ProxyMetadata, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	this.reflection.isMethod = function() {
		var result = !object.isNull(instanceOrType) && !object.isNull(memberName) && !object.isNull(instanceOrType[memberName]) && object.isFunction(instanceOrType[memberName]);
		logger.info(ProxyMetadata, "isMethod", "Is Method?", [result]);
		return result;
	};

	this.reflection.isFunction = function() {
		var result = object.isNull(memberName) && object.isFunction(instanceOrType);
		logger.info(ProxyMetadata, "isFunction", "Is Function?", [result]);
		return result;
	};

	this.reflection.isProperty = function() {
		var result = !object.isFunction(instanceOrType[memberName]);
		logger.info(ProxyMetadata, "isProperty", "Is Property?", [result]);
		return result;
	};

	this.reflection.isInstance = function() {
		this.isFunction();
		var result = object.isNull(memberName) && object.isObject(instanceOrType);
		logger.info(ProxyMetadata, "isInstance", "Is Instance?", [result]);
		return result;
	};

	this.reflection.isPrototype = function() {
		var result = object.isNull(memberName) && object.isFunction(instanceOrType) && !object.isNull(instanceOrType.prototype);
		logger.info(ProxyMetadata, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	this.reflection.hasMember = function() {
		return !object.isNull(memberName);
	};

	return this;
};