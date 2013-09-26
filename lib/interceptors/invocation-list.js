var g = require("../../include");

function Invocation(thisContext, target) {

	"use strict";

	var self = this;
	self.target = target;
	self.thisContext = thisContext;

	var getArguments = function(args) {
		return Array.prototype.slice.call(args);
	};

	self.invoke = function() {
		var callArguments = getArguments(arguments);
		if (!g.ext.object.isNull(target)) {
			return target.apply(thisContext, callArguments);
		};
	}
}

function InvocationList(thisContext, target) {

	"use strict";

	var self = this;
	self.previous = new Invocation(thisContext, target);

	self.addInvocation = function(interceptor, interceptorThisContext) {
		if (g.ext.object.isNull(interceptorThisContext))
			self.previous = new Invocation(thisContext, self.previous.invoke, interceptor);
		else
			self.previous = new Invocation(interceptorThisContext, self.previous.invoke, interceptor);
	};

	var getArguments = function(args) {
		return Array.prototype.slice.call(args);
	};

	self.invoke = function() {
		var callArguments = getArguments(arguments);
		var result = self.previous.invoke.apply(self.previous.thisContext, callArguments);
		return result;
	};
}

module.exports = InvocationList;
