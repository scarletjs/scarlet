function ObjectExtended() {

	"use strict";

	var self = this;
	var enumerable = require("./enumerable");
	self.__typename__ = "scarlet.lib.extensions.Object";

	self.has = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	};

	self.isObject = function(obj) {
		return obj instanceof Object;
	};

	self.isFunction = function(obj) {
		return obj instanceof Function;
	};

	self.isNull = function(obj) {
		if (typeof(obj) === "object")
			return obj === null;
		return typeof(obj) === "undefined";
	};

	self.inherit = function(child, parent) {
		child.__super__ = parent;
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: child,
				writable: true,
				enumerable: false,
				configurable: true
			}
		});
	};

	self.name = function(obj) {
		if (!obj)
			return "undefined";

		if (obj.name)
			return obj.name;

		if (obj.constructor) {
			if (obj.constructor.name)
				return obj.constructor.name;
		}

		var funcNameRegex = /function\s([^(]{1,})\(/;
		var results = (funcNameRegex).exec((obj).toString());
		if ((results && results.length > 1))
			return results[1].trim();

		if (obj instanceof Function)
			return "Function";

		return "Object";
	};
	
	self.objectHasFunction = function(object, objectFunction) {
		for (var property in object) {
			if (object[property] == objectFunction)
				return true;
		}
		return false;
	};
	
	self.extend = function(fromObject, toObject) {
		for (var property in fromObject) {
			toObject[property] = fromObject[property];
		}
	};

}

module.exports = new ObjectExtended();