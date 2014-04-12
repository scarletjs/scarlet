var sinon = require("sinon");

module.exports = function eventBuilder(scarlet){
	"use strict";
	
	var self = this;

	self.events ={};

	self.withAfterEvent = function(){
		self.events.afterEventSpy = sinon.spy();
		scarlet.on("after",self.events.afterEventSpy);
		return self;
	};

	self.withBeforeEvent = function(){
		self.events.beforeEventSpy = sinon.spy();
		scarlet.on("before",self.events.beforeEventSpy);
		return self;
	};

	self.withDoneEvent = function(){
		self.events.doneEventSpy = sinon.spy();
		scarlet.on("done",self.events.doneEventSpy);
		return self;
	};

	self.withErrorEvent = function(){
		self.events.errorEventSpy = sinon.spy();
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