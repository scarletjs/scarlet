require("../include");

function Dispatcher() {

	"use strict";

	var self = this;
	self.methodCalls = [];
	self.onCompleteHandler = null;
	self.object = require("./extensions/object");
	self.enumerable = require("./extensions/enumerable");
	self.linkedArray = require("./extensions/linked-array");

	self.isAsynchronous = function(callback) {
		var parameters = self.object.getParameterNames(callback);
		return parameters.length == 3 && parameters[2] == "done";
	};

	self.onComplete = function(callback) {
		self.onCompleteHandler = callback;
	};

	self.subscribeCall = function(method, thisContext) {
		self.methodCalls.push({
			method: method,
			thisContext: thisContext
		});
	};

	self.getCallChain = function() {
		return self.linkedArray.build(self.methodCalls);
	};

	self.dispatch = function(invocation) {
		self.enumerable.forEach(self.methodCalls, function(methodCall) {
			if (typeof(methodCall.thisContext) == "undefined")
				methodCall.thisContext = invocation.object;
			methodCall.method.call(methodCall.thisContext, invocation.proceed, invocation);
		});
		if (self.onCompleteHandler)
			self.onCompleteHandler(self, invocation);
	};

	self.dispose = function() {
		self.methodCalls = [];
	};

}

module.exports = Dispatcher;