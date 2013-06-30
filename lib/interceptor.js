var assert = require("assert");
var invocation = require("./invocation");
var proxyInstance = require("./proxy-instance");
var proxyPrototype = require("./proxy-prototype");

function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

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