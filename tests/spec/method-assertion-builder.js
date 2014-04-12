var assert = require("assert");
var enumerable = require("../../lib/extensions/enumerable");

var TypeAssertionBuilder = require("./types/type-assertion-builder");
var InterceptorAssertionBuilder = require("./interceptors/interceptor-assertion-builder");
var EventAssertionBuilder = require("./events/event-assertion-builder");

module.exports = function MethodAssertionBuilder(method){
	var builders = {
		typeAssertionBuilder : new TypeAssertionBuilder(),
		eventAssertionBuilder : new EventAssertionBuilder(),
		interceptorAssertionBuilder : new InterceptorAssertionBuilder()
	};

	this.withEvents = function(events){
		builders.eventAssertionBuilder.withEvents(events);
		return this;
	};

	this.withInterceptors = function(interceptors){
		builders.interceptorAssertionBuilder.withInterceptors(interceptors);
		return this;
	};

	this.withExpectedResult = function(result){
		this.result = result;
		return this;
	};
	
	this.withParameters = function(parameters){
		this.parameters = parameters;
		return this;
	};

	this.assert = function(){
		enumerable.forEach(builders,function(builder){
			builder.forMethod();
		});

		builders.typeAssertionBuilder.assert(method, this.result, this.parameters,function(method,result,parameters){
			builders.interceptorAssertionBuilder.assert(method,result,parameters);
			builders.eventAssertionBuilder.assert(method,result,parameters);
		});
	};
};