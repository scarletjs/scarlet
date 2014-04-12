var methodAssert = require("./assertions/methodAssertions");
var propertyGet = require("./assertions/propertyGetAssertions");
var propertySet = require("./assertions/propertySetAssertions");
var errorMethodAssert = require("./assertions/errorMethodAssertions");

module.exports = function TypeAssertionBuilder(){
	"use strict";

	var self = this;
	this.assertions = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};
	this.forPropertyGet = function(){
		addAssertion(propertyGet);
	};
	this.forPropertySet = function(){
		addAssertion(propertySet);
	};
	this.forProperty = function(){
		this.forPropertyGet();
		this.forPropertySet();
	};
	this.forMethod = function(){
		addAssertion(methodAssert);
	};
	this.forErrorMethod = function(){
		addAssertion(errorMethodAssert);
	};

	this.assert = function(instance,expectedResult,parameters,next){
		for (var i = 0; i < self.assertions.length; i++) {
			self.assertions[i](instance,expectedResult,parameters);
		}
		if(next)
			next(instance,expectedResult,parameters);
		self.assertions = [];
	};
};