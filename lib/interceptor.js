var assert = require("assert");
var Invocation = require("./invocation");
var ProxyInstance = require("./proxy-instance");
var ProxyPrototype = require("./proxy-prototype");

function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

	var self = this;

	self.targets = [];
	self.proxy = null;
	self.currentTarget = 0;
	self.type = typeOrInstance;
	self.proxiedInstance = null;
	self.instance = typeOrInstance;

	self.asType = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyPrototype(self);
		initProxy();
		return self;
	};

	self.asObject = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyInstance(self);
		initProxy();
		return self;
	};

	var initProxy = function(){
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before initializing a proxy");

		self.proxiedInstance = self.proxy.whenCalled(function(method, args) {

			var _invocation = new Invocation(self.instance, method, args);

			var next = function(error, result){

				if(self.currentTarget >= self.targets.length){
					self.currentTarget = 0;	
					return _invocation.proceed();
				}

				var targetMethod = self.targets[self.currentTarget];
				self.currentTarget++;
				targetCall(targetMethod);

				return _invocation.result;
			};

			var targetCall = function(target){
				target.targetMethod.apply(target.targetThisContext,[next,_invocation]);
			};

			next();

			return _invocation.result;

		});
	};

	self.addTarget = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.targets.push(target);
	};

}

module.exports = Interceptor;