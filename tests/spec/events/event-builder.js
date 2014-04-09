var sinon = require("sinon");
var EventAssertionBuilder = require("./event-assertion-builder");

module.exports = function eventBuilder(scarlet){
	"use strict";
	
	var self = this;
	this.eventAssertionBuilder = new EventAssertionBuilder();

	self.events ={
		doneEventSpy : sinon.spy(),
		errorEventSpy : sinon.spy(),
		afterEventSpy : sinon.spy(),
		beforeEventSpy : sinon.spy()
	};

	self.withAfterEvent = function(){
		this.eventAssertionBuilder.usingAfterEventListener(self.events.afterEventSpy);
		scarlet.on("after",self.events.afterEventSpy);
		return self;
	};

	self.withBeforeEvent = function(){
		this.eventAssertionBuilder.usingBeforeEventListener(self.events.beforeEventSpy);
		scarlet.on("before",self.events.beforeEventSpy);
		return self;
	};

	self.withDoneEvent = function(){
		this.eventAssertionBuilder.usingDoneEventListener(self.events.doneEventSpy);
		scarlet.on("done",self.events.doneEventSpy);
		return self;
	};

	self.withErrorEvent = function(){
		this.eventAssertionBuilder.usingErrorEventListener(self.events.errorEventSpy);
		scarlet.on("error",self.events.errorEventSpy);
		return self;
	};

	self.withAllEventListeners = function(){
		self.withDoneEvent();
		self.withErrorEvent();
		self.withAfterEvent();
		self.withBeforeEvent();

		return self;
	};
};