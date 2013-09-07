require("../include");

function Dispatcher(){

	"use strict";

	var self = this;
	self.methodCalls = [];
	self.onComplete = null;
	self.enumerable = require("./extensions/enumerable");

	self.onComplete = function(callback) {
		self.onComplete = callback;
	};

	self.subscribeCall = function(method){
		self.methodCalls.push(method);
	};

	self.dispatch = function(invocation){
		self.enumerable.forEach(self.methodCalls, function(method){
			method.call(invocation.object, invocation.proceed, invocation);
		});
		self.onComplete(self);
	};

	self.dispose = function(){
		self.methodCalls = [];
	};

}

module.exports = Dispatcher;
