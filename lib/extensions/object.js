function ObjectExtensions(){

	"use strict";

	var self = this;

	self.tryToInstantiate = function(obj) {
		try{
			return new obj();
		} catch (err) {
			return new function(){};
		}
	};

	self.isFunction = function(obj) {
		return typeof(obj) == "function";
	};

	self.hasMember = function(obj, memberName){
		var typeToCheck = obj;
		if(typeToCheck.hasOwnProperty(memberName))
			return true;
		if (self.isFunction(typeToCheck))
			typeToCheck = self.tryToInstantiate(typeToCheck);
		for(var enumerableProperty in typeToCheck){
			if(enumerableProperty === memberName){
				return true;
			}
		}
		return false;
	};

	self.isNull = function(obj) {
		if (typeof(obj) == "object")
			return obj == null;
		return typeof(obj) == "undefined";
	}

	self.hasProperty = function(obj, propertyName) {
		var typeToCheck = obj;
		if (self.isFunction(typeToCheck))
			typeToCheck = self.tryToInstantiate(typeToCheck);
		var hasMember = self.hasMember(obj, propertyName);
		return hasMember && !self.isFunction(typeToCheck[propertyName]);
	};

	self.getFunctionCode = function(obj) {
		return obj.toString();
	};

	self.getParameterNames = function(fn) {
		var code = self.getFunctionCode(fn);
	    return code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
	};

	self.parseNameFromCode = function(obj) {
		var code = self.getFunctionCode(obj);
		var regularExpression = /function\s([^(]{1,})\(/;
		var results = (regularExpression).exec(code);
		if (results && results.length > 1)
			return results[1].trim();
		return null;
	};

	self.getName = function(obj) {
		if(self.hasProperty(obj, "name"))
			return object.name;
		if(self.hasProperty(obj, "constructor") && self.hasProperty(obj.constructor, "name"))
			return object.constructor.name;
		var functionName = self.parseNameFromCode(obj);
		if (functionName != null)
			return functionName;
		if(obj instanceof Function)
			return "Function";
		return "Object";
	};

	self.inherit = function(child, parent) {
		child.super_ = parent;
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: child,
				writable: true,
				enumerable: false,
				configurable: true
			}
		});
	};
}

module.exports = new ObjectExtensions();