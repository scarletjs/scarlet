var assert = require("assert");
var proxyInstance = require("./proxy-instance");
var inherits = require("./extensions/inherits");
var enumerable = require("./extensions/enumerable");

function ProxyPrototype(interceptor, callback) {

	var self = this;

	self.inheritedType = null;
	self.interceptor = interceptor;

	self.whenCalled = function(target) {

		assert(interceptor.type, "Scarlet::Interceptor::type == null");
		assert(interceptor.type.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

		self.inheritedType = function(){

			var self = this;

			(function() {

				interceptor.type.call(self);
				interceptor.instance = self;

				var proxy = new proxyInstance(interceptor);
				proxy.whenCalled(target);

			}());

		};

		inherits(self.inheritedType, interceptor.type);
		return self.inheritedType;
		
	};

	self.unwrap = function() {};

}

module.exports = ProxyPrototype;