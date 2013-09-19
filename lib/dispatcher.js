var g = require("../include");
var ext = require("./extensions");

function Dispatcher() {

	"use strict";

	var self = this;
	self.methodCalls = [];
	self.onCompleteHandler = null;
	self.object = require("./extensions/object");
	self.enumerable = require("./extensions/enumerable");
	self.linkedArray = require("./extensions/linked-array");

	self.onComplete = function(callback) {
		self.onCompleteHandler = callback;
	};

	self.completeInvoke = function(invocation) {
		if (self.onCompleteHandler)
			self.onCompleteHandler(invocation);
	};

	self.subscribeCall = function(method, thisContext) {
		self.methodCalls.push({
			method: method,
			thisContext: thisContext
		});
	};

	self.getCallChain = function(forEach) {
		return self.linkedArray.build(self.methodCalls, forEach);
	};

	self.isAsynchronous = function(callback) {
		var parameters = self.object.getParameterNames(callback);
		return parameters.length == 3;
	};

	var handleNextCall = function(self, currentCall, invocation) {
		currentCall.method.call(currentCall.thisContext, invocation.proceed, invocation, function(result) {
			self.invokeCall(invocation, currentCall.next());
		});
	};

	self.invokeCall = function(invocation, currentCall) {
		if (self.object.isNull(currentCall))
			return;

		if (self.object.isNull(currentCall) || typeof(currentCall) == "undefined" || currentCall == null) {
			self.completeInvoke(invocation);
			return;
		} 

		if (self.object.isNull(currentCall.thisContext) && self.object.isNull(invocation.object)) {
			currentCall.thisContext = new Object();
		} else if (self.object.isNull(currentCall.thisContext) && !self.object.isNull(invocation.object)) {
			currentCall.thisContext = invocation.object;
		}

		if (self.isAsynchronous(currentCall.method)) {
			var result = handleNextCall(self, currentCall, invocation);
			if (!self.object.isNull(result))
				invocation.result = result;
		} else {
			var result = currentCall.method.call(currentCall.thisContext, invocation.proceed, invocation);
			if (!self.object.isNull(result))
				invocation.result = result;
			self.invokeCall(invocation, currentCall.next());
		}
	};

	self.dispatch = function(invocation) {
		var callChain = self.getCallChain();
		self.invokeCall(invocation, callChain);
	};

	self.dispose = function() {
		self.methodCalls = [];
	};
}

module.exports = Dispatcher;