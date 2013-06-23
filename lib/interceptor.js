var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");
var enumerable = require("./enumerable");
var invocation = require("./invocation");
var proxyPrototype = require("./proxy-prototype");
var proxyInstance = require("./proxy-instance");

function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet:Interceptor::typeOrInstance == null");

	var self = this;

	self.proxy = null;
	self.type = typeOrInstance;
	self.instance = typeOrInstance;

	var invocation = require("./invocation");

	self.asType = function() {
		self.proxy = new proxyPrototype(self);
		return self;
	};

	self.asObject = function() {
		self.proxy = new proxyInstance(self);
		return self;
	};

	self.using = function(targetMethod,targetThisContext) {

		assert(targetMethod, "Cannot have null target for interceptor");
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before assigning an interceptor with 'using(target)'");

		if(!targetThisContext)
			targetThisContext = self;

		return self.proxy.whenCalled(function(method, args) {
			var _invocation = new invocation(self.instance, method, args);
			return targetMethod.apply(targetThisContext,[_invocation]);
		});
	};

	self.release = function() {
		proxy.unwrap();
		return self;
	};

}

module.exports = Interceptor;