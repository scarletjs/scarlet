require("../include");

function Dispatcher(){

	"use strict";

	var self = this;
	self.methodCalls = [];
	self.onCompleteHandler = null;
	self.enumerable = require("./extensions/enumerable");

	self.onComplete = function(callback) {
		self.onCompleteHandler = callback;
	};

	self.subscribeCall = function(method, thisContext){
		self.methodCalls.push({
			method: method,
			thisContext: thisContext
		});
	};

	self.dispatch = function(invocation){
		self.enumerable.forEach(self.methodCalls, function(methodCall){
			if (typeof(methodCall.thisContext) == "undefined")
				methodCall.thisContext = invocation.object;
			methodCall.method.call(methodCall.thisContext, invocation.proceed, invocation);
		});
		if (self.onCompleteHandler)
			self.onCompleteHandler(self, invocation);
	};

	self.dispose = function(){
		self.methodCalls = [];
	};

}

module.exports = Dispatcher;
