var assert = require("assert");
var builder = require("./scarlet-builder");
var Scarlet = require("../../lib/scarlet");

describe("When using math.min",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withCallbackInterceptor()
		.withAllEventListeners()
		.forMethod(Math.min)
		.withParameters([1,2,3])
		.withExpectedResult(1)
		.assert();
});

describe("When using multiple interceptors that changes results",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withAllEventListeners()
		.withInterceptor(function(proceed){
			proceed(null, "any interceptor result");
		})
		.withInterceptor(function(proceed){
			proceed(null, "any interceptor2 result");
		})
		.forMethod(function(){
			return "any";
		})
		.withExpectedResult("any interceptor2 result")
		.assert();
});

describe("When using an interceptor that changes results",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withAllEventListeners()
		.withInterceptor(function(proceed){
			proceed(null, "any interceptor result");
		})
		.forMethod(function(){
			return "any";
		})
		.withExpectedResult("any interceptor result")
		.assert();
});

describe("When using an interceptor that produces an error",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withCallbackErrorInterceptor()
		.withAllEventListeners()
		.forErrorMethod(function(){
			//throws error through interceptor
		})
		.assert();
	describe("when interceptor accepts an error",function(){
		builder.for(scarlet)
			.withCallbackErrorInterceptor()
			.withInterceptor(function(error,invocation,proceed){
				proceed();
			})
			.withAllEventListeners()
			.forMethod(function(){
				return "any";
			})
			.withExpectedResult("any")
			.assert();
	});
});

describe("When using a callback interceptor",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withCallbackInterceptor()
		.withAllEventListeners()
		.withAllInstanceTypes()
		.assert();
});

describe("When using multiple callback interceptor",function(){
	var scarlet = new Scarlet();
	builder.for(scarlet)
		.withCallbackInterceptor()
		.withCallbackInterceptor()
		.withCallbackInterceptor()
		.withAllEventListeners()
		.withAllInstanceTypes()
		.assert();
});