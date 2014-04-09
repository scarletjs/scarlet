// var beforeEventAssertion = require('./assertions/beforeEventAssertion');
// var doneEventAssertion = require('./assertions/doneEventAssertion');
var errorEventWhenNoErrorAssertion = require('./assertions/errorEventWhenNoErrorAssertion');

var eventMethodWithReturn = require("./assertions/eventMethodWithReturnAssertion");
var eventPropertyGet = require("./assertions/eventPropertyGetAssertion");
var eventPropertySet = require("./assertions/eventPropertySetAssertion");

var errorEventMethodWithReturn = require("./assertions/errorEventMethodWithReturnAssertion");
var errorEventPropertyGet = require("./assertions/errorEventPropertyGetAssertion");
var errorEventPropertySet = require("./assertions/errorEventPropertySetAssertion");

module.exports = function(){
	var self = this;

	this.doneEvent;
	this.errorEvent;
	this.afterEvent;
	this.beforeEvent;
	this.assertions = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};

	this.forMethodWithReturn = function(){	
		addAssertion(function(instance){
			if(self.afterEvent)
				eventMethodWithReturn(instance,self.afterEvent,"after");
			if(self.doneEvent)
				eventMethodWithReturn(instance,self.doneEvent,"done");
			if(self.beforeEvent)
				eventMethodWithReturn(instance,self.beforeEvent,"after");
			if(self.errorEvent)
				errorEventMethodWithReturn(instance,self.errorEvent);
		});
	};
	
	this.forPropertyGet = function(){
		addAssertion(function(instance){
			if(self.afterEvent)
				eventPropertyGet(instance,self.afterEvent,"after");
			if(self.doneEvent)
				eventPropertyGet(instance,self.doneEvent,"done");
			if(self.beforeEvent)
				eventPropertyGet(instance,self.beforeEvent,"before");
			if(self.errorEvent)
				errorEventPropertyGet(instance,self.errorEvent);
		});
	};

	this.forPropertySet = function(){
		addAssertion(function(instance){
			if(self.afterEvent)
				eventPropertySet(instance,self.afterEvent,"after");
			if(self.doneEvent)
				eventPropertySet(instance,self.doneEvent,"done");
			if(self.beforeEvent)
				eventPropertySet(instance,self.beforeEvent,"before");
			if(self.errorEvent)
				errorEventPropertySet(instance,self.errorEvent);
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

	this.assert = function(instance,next){
		console.log(self.assertions.length);
		for (var i = 0; i < self.assertions.length; i++) {
			self.assertions[i](instance);
		}
		if(next){
			next(instance);
		}
	};
};