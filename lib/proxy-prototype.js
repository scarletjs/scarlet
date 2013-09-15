var g = require("../include");
var ext = require("./extensions");

function ProxyPrototype(instance) {

	"use strict";

	g.assert(instance, "Attempted to proxy a null instance");
	g.assert(instance.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

	var ProxyInstance = require("./proxy-instance");

	var self = this;

	self.inheritedType = null;
	self.instance = instance;

	self.whenCalled = function(target) {
		self.inheritedType = function() {
			var self = this;
			var args = arguments;
			return (function() {
				var interceptorTypeConstructor = function() {
					var result = null;
					var parameters = Array.prototype.slice.call(arguments);
					if (instance.apply)
						result = instance.apply(self, parameters);
					if (!self)
						return result;
					var proxy = new ProxyInstance(self);
					proxy.whenCalled(target);
					return result;
				};
				interceptorTypeConstructor.toString = function(){return instance.toString();};
				return target(self, interceptorTypeConstructor, args);

			}());
		};
		ext.object.inherit(self.inheritedType, instance);
		self.inheritedType.toString = function(){return instance.toString();};
		return self.inheritedType;
	};

	self.unwrap = function() {
		// TODO
	};

	return self;
}

module.exports = ProxyPrototype;