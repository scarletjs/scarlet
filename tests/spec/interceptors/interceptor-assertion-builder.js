var propertyGetAssertions = require("./assertions/propertyGetAssertions");
var propertySetAssertions = require("./assertions/propertySetAssertions");
var methodAssertions = require("./assertions/methodAssertions");
var errorMethodAssertions = require("./assertions/errorMethodAssertions");

module.exports = function InterceptorAssertionBuilder(){
	var self = this;
	this.assertions = [];
	this.interceptors = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};
	this.forPropertyGet = function(){
		addAssertion(propertyGetAssertions);
	};
	this.forPropertySet = function(){
		addAssertion(propertySetAssertions);
	};
	this.forProperty = function(){
		this.forPropertyGet();
		this.forPropertySet();
	};
	this.forMethod = function(){
		addAssertion(methodAssertions);
	};
	this.forErrorMethod = function(){
		addAssertion(errorMethodAssertions);
	};
	this.withInterceptors = function(interceptors){
		if(!interceptors)
			return;
		this.interceptors = interceptors;
	};

	this.assert = function(method,result,parameters,next){
		for (var i = 0; i < this.interceptors.length; i++) {
			var interceptor = this.interceptors[i];
			for (var j = 0; j < self.assertions.length; j++) {
				self.assertions[j](interceptor,method,result,parameters);
			}
		}
		if(next)
			next(method,result,parameters);
		self.assertions = [];
	};
};