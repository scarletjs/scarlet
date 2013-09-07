require("../include");

function Dispatcher() {

	"use strict";

	var self = this;
	self.methodCalls = [];
	self.onCompleteHandler = null;
	self.object = require("./extensions/object");
	self.enumerable = require("./extensions/enumerable");

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

	self.emptyMethod = function(){
		return null;
	};

	self.createCallChain = function(methodCallObj, nextChain) {
		if (nextChain == null)
			nextChain = self.emptMethod;
		methodCallObj.next = nextChain;
		return methodCallObj;
	};

	self.createNextChain = function(callChain) {
		return function(){
			return callChain;
		};
	};

	self.getCallChain = function() {
		var firstCall = null;
		var currentCall = null;
		var previousCall = null;
		self.enumerable.forEach(self.methodCalls, function(methodCallObj){
			if (self.object.isNull(firstCall)) {
				firstCall = self.createCallChain(methodCallObj)
				currentCall = firstCall;
			} else {
				currentCall = self.createCallChain(methodCallObj);
				previousCall.next = self.createNextChain(currentCall);
			}		
			previousCall = currentCall;
		})
		return firstCall;
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