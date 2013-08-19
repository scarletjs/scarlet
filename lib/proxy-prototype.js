var assert = require("assert");
var ProxyInstance = require("./proxy-instance");
var inherits = require("./extensions/inherits");
var enumerable = require("./extensions/enumerable");

function ProxyPrototype(interceptor) {

	var self = this;

	self.inheritedType = null;

	self.interceptor = interceptor;

	self.whenCalled = function(target) {

		assert(interceptor.type, "Scarlet::Interceptor::type == null");
		assert(interceptor.type.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

		self.inheritedType = function(){

			var self = this;

			(function() {
				var interceptorTypeConstructor = function(){
					var parameters = Array.prototype.slice.call(arguments);
					interceptor.type.apply(self,parameters);

					interceptor.instance = self;

					var proxy = new ProxyInstance(interceptor);
					proxy.whenCalled(target);
				};

				return target(interceptorTypeConstructor,arguments);
			}());

		};

		inherits(self.inheritedType, interceptor.type);
		return self.inheritedType;
		
	};

	self.unwrap = function() {};

}

module.exports = ProxyPrototype;
