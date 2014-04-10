var eventPropertyGet = require("./assertions/eventPropertyGetAssertion");
var eventPropertySet = require("./assertions/eventPropertySetAssertion");
var errorEventPropertyGet = require("./assertions/errorEventPropertyGetAssertion");
var errorEventPropertySet = require("./assertions/errorEventPropertySetAssertion");
var eventMethod = require("./assertions/eventMethodAssertion");
var errorEventMethod = require("./assertions/errorEventMethodAssertion");
var errorEventErrorMethod = require("./assertions/errorEventErrorMethodAssertion");
var postEventErrorMethodAssertion = require("./assertions/postEventErrorMethodAssertion");

module.exports = function(){
	var self = this;

	this.doneEvent = null;
	this.errorEvent = null;
	this.afterEvent = null;
	this.beforeEvent = null;
	this.assertions = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};

	this.forMethod = function(){	
		addAssertion(function(method,expectedResult,parameters){
			if(self.afterEvent)
				eventMethod(self.afterEvent,method,expectedResult,parameters,"after");
			if(self.doneEvent)
				eventMethod(self.doneEvent,method,expectedResult,parameters,"done");
			if(self.beforeEvent)
				eventMethod(self.beforeEvent,method,expectedResult,parameters,"before");
			if(self.errorEvent)
				errorEventMethod(self.errorEvent,method,expectedResult,parameters);
		});
	};
	
	this.forPropertyGet = function(){
		addAssertion(function(instance,expectedResult,property){
			if(self.afterEvent)
				eventPropertyGet(self.afterEvent,instance,expectedResult,property,"after");
			if(self.doneEvent)
				eventPropertyGet(self.doneEvent,instance,expectedResult,property,"done");
			if(self.beforeEvent)
				eventPropertyGet(self.beforeEvent,instance,expectedResult,property,"before");
			if(self.errorEvent)
				errorEventPropertyGet(self.errorEvent,instance,expectedResult,property);
		});
	};

	this.forPropertySet = function(){
		addAssertion(function(instance,expectedResult,property){
			if(self.afterEvent)
				eventPropertySet(self.afterEvent,instance,expectedResult,property,"after");
			if(self.doneEvent)
				eventPropertySet(self.doneEvent,instance,expectedResult,property,"done");
			if(self.beforeEvent)
				eventPropertySet(self.beforeEvent,instance,expectedResult,property,"before");
			if(self.errorEvent)
				errorEventPropertySet(self.errorEvent,instance,expectedResult,property);
		});
	};
	this.forErrorMethod = function(){
		addAssertion(function(method,expectedResult,parameters){
			if(self.afterEvent)
				postEventErrorMethodAssertion(self.afterEvent,method,expectedResult,parameters,"after");
			if(self.doneEvent)
				postEventErrorMethodAssertion(self.doneEvent,method,expectedResult,parameters,"done");
			if(self.beforeEvent)
				eventMethod(self.beforeEvent,method,expectedResult,parameters,"before");
			if(self.errorEvent)
				errorEventErrorMethod(self.errorEvent,method,expectedResult,parameters);
		});
	};
	this.forProperty = function(){
		this.forPropertySet();
		this.forPropertyGet();
	};
	this.forInstance = function(){
		this.forProperty();
		this.forMethodWithReturn();
	};
	this.usingErrorEventListener = function(errorEvent){
		this.errorEvent = errorEvent;
	};

	this.usingBeforeEventListener = function(beforeEvent){
		this.beforeEvent = beforeEvent;
	};

	this.usingAfterEventListener = function(afterEvent){
		this.afterEvent = afterEvent;
	};

	this.usingDoneEventListener = function(doneEvent){
		this.doneEvent = doneEvent;
	};

	this.assert = function(instance,expectedResult,parameters,next){
		for (var i = 0; i < self.assertions.length; i++) {
			self.assertions[i](instance,expectedResult,parameters);
		}
		if(next){
			next(instance,expectedResult,parameters);
		}
		self.assertions = [];
	};
};