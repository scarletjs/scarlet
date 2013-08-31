function ObjectExtensions(){

	"use strict";

	var self = this;

	self.isNull = function(obj) {
		return typeof(obj) == "undefined";
	}

	self.hasProperty = function(obj, propertyName) {
		return self.isNull(obj) && typeof(obj[propertyName]) != "undefined";
	};

	self.getFunctionCode = function(obj) {
		return obj.toString();
	};

	self.parseNameFromCode = function(obj) {
		var code = self.getFunctionCode(obj);
		var regularExpression = /function\s([^(]{1,})\(/;
		var functionName = (regularExpression).exec(code);
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
		if(object instanceof Function)
			return "Function";
		return "Object";
	};

	self.inherit = function(child, parent) {
		child.super_ = parent;
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: ctor,
				writable: true,
				enumerable: false,
				configurable: true
			}
		});
	};
}

module.exports = new ObjectExtensions();