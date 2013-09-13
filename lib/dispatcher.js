var g = require("../include");

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

	self.completeInvoke = function(invocation){
		if (self.onCompleteHandler)
			self.onCompleteHandler(invocation);
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

	self.isAsynchronous = function(callback) {
		var parameters = self.object.getParameterNames(callback);
		return parameters.length == 3;
	};

	self.invokeCall = function(invocation, currentCall){
		if (self.object.isNull(currentCall)){
			self.completeInvoke(invocation);
			return;		
		}
		if (self.object.isNull(currentCall.thisContext))
			currentCall.thisContext = invocation.object;
		if (self.isAsynchronous(currentCall.method)) {
			currentCall.method.call(currentCall.thisContext, invocation.proceed, invocation, function(result){
				self.invokeCall(invocation, currentCall.next());
				invocation.result = result;
			});
		} else {
			invocation.result = currentCall.method.call(currentCall.thisContext, invocation.proceed, invocation);
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