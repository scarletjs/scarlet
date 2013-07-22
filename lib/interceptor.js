var assert = require("assert");
var invocation = require("./invocation");
var proxyInstance = require("./proxy-instance");
var proxyPrototype = require("./proxy-prototype");
var async = require('async');

function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

	var self = this;

	self.targets = [];
	self.proxy = null;
	self.type = typeOrInstance;
	self.proxiedInstance = null;
	self.instance = typeOrInstance;

	var invocation = require("./invocation");

	self.asType = function() {
		assert(self.proxy == null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new proxyPrototype(self);
		self.initProxy();
		return self;
	};

	self.asObject = function() {
		assert(self.proxy == null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new proxyInstance(self);
		self.initProxy();
		return self;
	};

	self.initProxy = function(){
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before initializing a proxy");

		self.proxiedInstance = self.proxy.whenCalled(function(method, args) {

			var _invocation = new invocation(self.instance, method, args);
						
			var next = function(target,callback){
				
				var callbackWithReturn = function(error, result){
					callback(error,result);
					return _invocation.result;
				}

				target.targetMethod.apply(target.targetThisContext,[callbackWithReturn,_invocation]);

				return _invocation.result;
			};

			async.mapSeries(self.targets,next.bind(self),function(err, result){
				_invocation.proceed();
			});

			return _invocation.result;

		});
	};

	self.using = function(targetMethod,targetThisContext) {
		assert(targetMethod, "Cannot have null target for interceptor");

		if(!targetThisContext)
			targetThisContext = self;

		self.addTarget(targetMethod,targetThisContext);

		return self;
	};

	self.addTarget = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.targets.push(target);
	};

	self.resolve = function(){
		//allows you to access the proxied method
		return self.proxiedInstance;
	};

	self.release = function() {

		proxy.unwrap();
		return self;
	};

}

module.exports = Interceptor;