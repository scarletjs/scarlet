require("../include");

var ProxyInstance = require("./proxy-instance");
var inherits = require("./extensions/inherits");
var enumerable = require("./extensions/enumerable");

var getObjectName = function(object){

	if(object.name)
		return object.name;

	if(object.constructor){
		if(object.constructor.name)
			return object.constructor.name;
	}
	
	var funcNameRegex = /function\s([^(]{1,})\(/;
	var results = (funcNameRegex).exec((object).toString());
	var name = (results && results.length > 1) ? results[1].trim() : "";

	return name;
};

function ProxyPrototype(instance) {
	
	"use strict";

	var self = this;

	self.inheritedType = null;
	self.instance = instance;

	self.whenCalled = function(target) {

		assert(instance, "Scarlet::Interceptor::type == null");
		assert(instance.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

		self.inheritedType = function(){
			
			var self = this;
			var args = arguments;
			var parameters = Array.prototype.slice.call(arguments);

			(function() {


				var interceptorTypeConstructor = function(){

					if(instance.apply)
						instance.apply(self,parameters);

					if(!self)
						return;

					var proxy = new ProxyInstance(self);
					proxy.whenCalled(target);
				};

				return target(self,interceptorTypeConstructor,args);

			}());

		};

		inherits(self.inheritedType, instance);

		return self.inheritedType;
		
	};

	self.unwrap = function() {};

	return self;

}

module.exports = ProxyPrototype;
