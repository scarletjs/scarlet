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
		.withNamedFunction()
		.assert();
});

// describe("When intercepting instance", function() {
// 	forEachInstanceType(function(instance){
// 		describe("When instance is:"+instance.name,function(){
// 			describe("when calling a method with return",function(){
// 				var scarlet = new Scarlet();
// 				builder.for(scarlet)
// 					.withCallbackInterceptor()
// 					.withAllEventListeners()
// 					.forInstance(instance)
// 					.forMethod(instance.methodWithReturn)
// 					.withExpectedResult("any")
// 					.assert();
// 			});
// 		});
// 	});
// 	forEachInstanceType(function(instance){
// 		describe("When instance is:"+instance.name,function(){
// 			describe("when accessing a property",function(){
// 				var scarlet = new Scarlet();
// 				builder.for(scarlet)
// 					.withCallbackInterceptor()
// 					.withAllEventListeners()
// 					.forInstance(instance)
// 					.forProperty(instance,"property")
// 					.withExpectedResult("any")
// 					.assert();
// 			});
// 		});
// 	});
// });

// describe("When intercepting method with return", function() {
// 	forEachInstanceType(function(instance){
// 		describe("When instance is:"+instance.name,function(){
// 			var scarlet = new Scarlet();
// 			builder.for(scarlet)
// 				.withCallbackInterceptor()
// 				.withAllEventListeners()
// 				.forMethod(instance.methodWithReturn)
// 				.withExpectedResult("any")
// 				.assert();
// 		});
// 	});
// });

// describe("When intercepting method with return by name", function() {
// 	forEachInstanceType(function(instance){
// 		describe("When instance is:"+instance.name,function(){
// 			var scarlet = new Scarlet();
// 			builder.for(scarlet)
// 				.withCallbackInterceptor()
// 				.withAllEventListeners()
// 				.forMethodByName(instance,"methodWithReturn")
// 				.withExpectedResult("any")
// 				.assert();
// 		});
// 	});
// });

// describe("When intercepting property", function() {
// 	forEachInstanceType(function(instance){
// 		describe("When instance is:"+instance.name,function(){
// 			var scarlet = new Scarlet();
// 			builder.for(scarlet)
// 				.withCallbackInterceptor()
// 				.withAllEventListeners()
// 				.forProperty(instance,"property")
// 				.withExpectedResult("any")
// 				.assert();
// 		});
// 	});
// });