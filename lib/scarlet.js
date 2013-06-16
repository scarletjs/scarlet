var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");
var enumerable = require("../enumerable");

function ProxyInstance(interceptor, callback) {

	var self = this;

	self.interceptor = interceptor;

	self.whenCalled = function(target) {

		if (!interceptor.instance.__scarlet) {

			interceptor.instance.__scarlet = {};

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				if (member instanceof Function) {
					var originalMethod = interceptor.instance.__scarlet[memberName] = interceptor.instance[memberName];
					interceptor.instance[memberName] = function() {
						target(originalMethod, arguments);
					};
				}

			});
		}

		return interceptor.instance;
	};

	self.unwrap = function() {

		if (interceptor.instance.__scarlet) {

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				if (member instanceof Function) {
					var originalMethod = interceptor.instance.__scarlet[memberName];
					interceptor.instance[memberName] = originalMethod;
				}

			});
		}

	};

}

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

				var proxy = new ProxyInstance(interceptor);
				proxy.whenCalled(target);

			}());

		};

		util.inherits(self.inheritedType, interceptor.type);
		return self.inheritedType;
		
	};

	self.unwrap = function() {};

}

function Invocation(object, method, args) {

	var self = this;

	self.args = args;
	self.object = object;
	self.method = method;
	self.result = null;

	self.proceed = function() {

		assert(self.method, "Scarlet::method == null");

		self.result = self.method(args);
		return self.result;
	};
}

function Interceptor(typeOrInstance) {

	var self = this;

	self.proxy = null;
	self.type = typeOrInstance;
	self.instance = typeOrInstance;

	self.asType = function() {
		self.proxy = new ProxyPrototype(self);
		return self;
	};

	self.asInstance = function() {
		self.proxy = new ProxyInstance(self);
		return self;
	};

	self.using = function(target) {

		assert(target, "Cannot have null target for interceptor");
		assert(self.proxy, "Please make sure you use the 'asInstance()' or 'asType()' method before assigning an interceptor with 'using(target)'");

		return self.proxy.whenCalled(function(method, args) {
			var invocation = new Invocation(typeOrInstance, method, args);
			target(invocation);
		});

	};

	self.release = function() {

		proxy.unwrap();
		return self;

	};

}

function Scarlet() {

	var self = this;

	self.intercept = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		return new Interceptor(typeOrInstance);
	};

}

module.exports = new Scarlet();