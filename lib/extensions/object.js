function ObjectExtended() {

	"use strict";

	var self = this;
	var enumerable = require("./enumerable");
	self.__typename__ = "scarlet.lib.extensions.Object";

	self.has = function(obj, key){
		return hasOwnProperty.call(obj, key);
	};

	self.isObject = function(obj){
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
}

module.exports = new ObjectExtended();