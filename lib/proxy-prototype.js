var assert = require("assert");
var ProxyInstance = require("./proxy-instance");
var inherits = require("./extensions/inherits");
var enumerable = require("./extensions/enumerable");

function ProxyPrototype(instance) {

	var self = this;

	self.inheritedType = null;
	self.instance = instance;

	self.whenCalled = function(target) {

		assert(instance, "Scarlet::Interceptor::type == null");
		assert(instance.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

		self.inheritedType = function(){

			var self = this;

			(function() {

				var interceptorTypeConstructor = function(){
					var parameters = Array.prototype.slice.call(arguments);
					if(instance.apply)
						instance.apply(self,parameters);

					var proxy = new ProxyInstance(self);
					proxy.whenCalled(target);
				};

				return target(self,interceptorTypeConstructor,arguments);

			}());

		};

		inherits(self.inheritedType, instance);

		return self.inheritedType;
		
	};

	self.unwrap = function() {};

	return self;

}

module.exports = ProxyPrototype;
