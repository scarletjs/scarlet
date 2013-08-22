var assert = require("assert");
var Invocation = require("./invocation");
var ProxyInstance = require("./proxy-instance");
var ProxyPrototype = require("./proxy-prototype");
var ProxyMember = require("./proxy-member");
var Series = require("./extensions/series");

function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

	var self = this;

	self.proxy = null;
	self.proxiedInstance = null;
	self.instance = typeOrInstance;
	self.series = new Series();

	self.forType = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyPrototype(self.instance,self);
		initProxy();
		return self;
	};

	self.forObject = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyInstance(self.instance);
		initProxy();
		return self;
	};

	self.forMember = function(memberName) {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");
		assert(memberName !== null, "When defining a member Interceptor must define a member property to intercept");

		self.proxy = new ProxyMember(self.instance,memberName);
		console.log("this");
		initProxy();
		return self;
	};

	var initProxy = function(){
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before initializing a proxy");

		self.proxiedInstance = self.proxy.whenCalled(function(instance,method, args) {

			var _invocation = new Invocation(instance, method, args);
			self.series.invoke(_invocation,_invocation.proceed);
			return _invocation.result;
		});
	};

	self.addTarget = function(targetMethod,targetThisContext){
		self.series.addTarget(targetMethod,targetThisContext);
		return self;
	};

	self.addAfter = function(targetMethod,targetThisContext){
		self.series.addDone(targetMethod,targetThisContext);
		return self;
	};
}

module.exports = Interceptor;