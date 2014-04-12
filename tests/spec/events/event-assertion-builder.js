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

	this.events = {};
	this.assertions = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};

	this.forMethod = function(){
		addAssertion(function(method,expectedResult,parameters){
			if(self.events.afterEventSpy)
				eventMethod(self.events.afterEventSpy,method,expectedResult,parameters,"after");
			if(self.events.doneEventSpy)
				eventMethod(self.events.doneEventSpy,method,expectedResult,parameters,"done");
			if(self.events.beforeEventSpy)
				eventMethod(self.events.beforeEventSpy,method,expectedResult,parameters,"before");
			if(self.events.errorEventSpy)
				errorEventMethod(self.events.errorEventSpy,method,expectedResult,parameters);
		});
	};
	
	this.forPropertyGet = function(){
		addAssertion(function(instance,expectedResult,property){
			if(self.events.afterEventSpy)
				eventPropertyGet(self.events.afterEventSpy,instance,expectedResult,property,"after");
			if(self.events.doneEventSpy)
				eventPropertyGet(self.events.doneEventSpy,instance,expectedResult,property,"done");
			if(self.events.beforeEventSpy)
				eventPropertyGet(self.events.beforeEventSpy,instance,expectedResult,property,"before");
			if(self.events.errorEventSpy)
				errorEventPropertyGet(self.events.errorEventSpy,instance,expectedResult,property);
		});
	};

	this.forPropertySet = function(){
		addAssertion(function(instance,expectedResult,property){
			if(self.events.afterEventSpy)
				eventPropertySet(self.events.afterEventSpy,instance,expectedResult,property,"after");
			if(self.events.doneEventSpy)
				eventPropertySet(self.events.doneEventSpy,instance,expectedResult,property,"done");
			if(self.events.beforeEventSpy)
				eventPropertySet(self.events.beforeEventSpy,instance,expectedResult,property,"before");
			if(self.events.errorEventSpy)
				errorEventPropertySet(self.events.errorEventSpy,instance,expectedResult,property);
		});
	};
	this.forErrorMethod = function(){
		addAssertion(function(method,expectedResult,parameters){
			if(self.events.afterEventSpy)
				postEventErrorMethodAssertion(self.events.afterEventSpy,method,expectedResult,parameters,"after");
			if(self.events.doneEventSpy)
				postEventErrorMethodAssertion(self.events.doneEventSpy,method,expectedResult,parameters,"done");
			if(self.events.beforeEventSpy)
				eventMethod(self.events.beforeEventSpy,method,expectedResult,parameters,"before");
			if(self.events.errorEventSpy)
				errorEventErrorMethod(self.events.errorEventSpy,method,expectedResult,parameters);
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
	this.withEvents = function(events){
		this.events = events;
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