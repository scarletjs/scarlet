var propertyGet = require("./assertions/propertyGetAssertions");
var propertySet = require("./assertions/propertySetAssertions");
var methodAssert = require("./assertions/methodAssertions");

module.exports = function TypeAssertionBuilder(){
	"use strict";

	var self = this;
	this.types = [];
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
	this.assert = function(instance,expectedResult,parameters,next){
		for (var i = 0; i < self.assertions.length; i++) {
			self.assertions[i](instance,expectedResult,parameters);
		}
		if(next)
			next(instance,expectedResult,parameters);
		self.assertions = [];
	};
};