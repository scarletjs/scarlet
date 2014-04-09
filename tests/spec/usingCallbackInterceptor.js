var assert = require("assert");
var builder = require("./scarlet-builder");
var Scarlet = require("../../lib/scarlet");
var dummies = require("./types/dummies");

var callbackInterceptor = require("./interceptors/interceptors/callbackInterceptor");

var forEachInstanceType = function(onEach){
	var instances = [new dummies.NamedFunc(),dummies.ObjectLiteral(),new dummies.PrototypeFunc(),new dummies.UnnamedFunc()];
	for (var i = 0; i < instances.length; i++) {
		var instance = instances[i];
		onEach(instance);
	}
};

describe("When using math.min",function(){
		var scarlet = new Scarlet();
		builder.for(scarlet)
			.withInterceptor(callbackInterceptor())
			.withAllEventListeners()
			.forMethod(Math.min)
			.withParameters([1,2,3])
			.withExpectedResult(1)
			.assert();
});

describe("When intercepting instance", function() {
	forEachInstanceType(function(instance){
		describe("When instance is:"+instance.name,function(){
			describe("when calling a method with return",function(){
				var scarlet = new Scarlet();
				builder.for(scarlet)
					.withInterceptor(callbackInterceptor())
					.withAllEventListeners()
					.forInstance(instance)
					.forMethod(instance.methodWithReturn)
					.withExpectedResult("any")
					.assert();
			});
		});
	});
	forEachInstanceType(function(instance){
		describe("When instance is:"+instance.name,function(){
			describe("when accessing a property",function(){
				var scarlet = new Scarlet();
				builder.for(scarlet)
					.withInterceptor(callbackInterceptor())
					.withAllEventListeners()
					.forInstance(instance)
					.forProperty(instance,"property")
					.withExpectedResult("any")
					.assert();
			});
		});
	});
});
describe("When intercepting method with return", function() {
	forEachInstanceType(function(instance){
		describe("When instance is:"+instance.name,function(){
			var scarlet = new Scarlet();
			builder.for(scarlet)
				.withInterceptor(callbackInterceptor())
				.withAllEventListeners()
				.forMethod(instance.methodWithReturn)
				.withExpectedResult("any")
				.assert();
		});
	});
});
describe("When intercepting method with return by name", function() {
	forEachInstanceType(function(instance){
		describe("When instance is:"+instance.name,function(){
			var scarlet = new Scarlet();
			builder.for(scarlet)
				.withInterceptor(callbackInterceptor())
				.withAllEventListeners()
				.forMethodByName(instance,"methodWithReturn")
				.withExpectedResult("any")
				.assert();
		});
	});
});

describe("When intercepting property", function() {
	forEachInstanceType(function(instance){
		describe("When instance is:"+instance.name,function(){
			var scarlet = new Scarlet();
			builder.for(scarlet)
				.withInterceptor(callbackInterceptor())
				.withAllEventListeners()
				.forProperty(instance,"property")
				.withExpectedResult("any")
				.assert();
		});
	});
});