function ObjectExtensions() {

	"use strict";

	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

	var self = this;
	var enumerable = require("./enumerable");

	self.tryToInstantiate = function(obj) {
		try {
			return new obj();
		} catch (err) {
			return new function() {};
		}
	};

	self.isFunction = function(obj) {
		return obj instanceof Function;
	};

	self.hasMember = function(obj, memberName) {
		var typeToCheck = obj;
		if (typeToCheck.hasOwnProperty(memberName))
			return true;
		if (self.isFunction(typeToCheck))
			typeToCheck = self.tryToInstantiate(typeToCheck);
		for (var enumerableProperty in typeToCheck) {
			if (enumerableProperty === memberName) {
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

	self.getParameterNames = function(func) {
		var args = [];
		if (typeof(func) == "function") {
			var funcText = func.toString().replace(STRIP_COMMENTS, "");
			var firstBracketIndex = funcText.indexOf("(");
			var secondBracketIndex = funcText.indexOf(")");
			var argStr = funcText.substring(firstBracketIndex + 1, secondBracketIndex);
			enumerable.forEach(argStr.split(","), function(arg) {
				args.push(arg.trim());
			});
		}
		return args;
	}

	self.parseNameFromCode = function(obj) {
		var code = self.getFunctionCode(obj);
		var regularExpression = /function\s([^(]{1,})\(/;
		var results = (regularExpression).exec(code);
		if (results && results.length > 1)
			return results[1].trim();
		return null;
	};

	self.getName = function(obj) {
		if (obj.name)
			return obj.name;
		if (obj.constructor)
			if (obj.constructor.name)
				return obj.constructor.name;
		var functionName = self.parseNameFromCode(obj);
		if (functionName != null)
			return functionName;
		if (obj instanceof Function)
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