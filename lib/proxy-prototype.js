require("../include");

var ext = require("./extensions");
var ProxyInstance = require("./proxy-instance");

function ProxyPrototype(instance) {

	assert(instance, "Attempted to proxy a null instance");
	assert(instance.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

	"use strict";

	var self = this;

	self.inheritedType = null;
	self.instance = instance;

	self.whenCalled = function(target) {
		self.inheritedType = function() {
			var self = this;
			var args = arguments;
			(function() {
				var interceptorTypeConstructor = function() {
					var parameters = Array.prototype.slice.call(arguments);
					if (instance.apply)
						instance.apply(self, parameters);
					if (!self)
						return;
					var proxy = new ProxyInstance(self);
					proxy.whenCalled(target);
				};
				return target(self, interceptorTypeConstructor, args);
			}());
		};
		ext.object.inherit(self.inheritedType, instance);
		return self.inheritedType;
	};

	self.unwrap = function() {
		// TODO
	};

	return self;
}

module.exports = ProxyPrototype;