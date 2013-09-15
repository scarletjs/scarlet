var g = require("../../include");
var builder = require("./builders");

var Scarlet = require("../../lib/scarlet")
var scarlet = new Scarlet();

describe("Given we are intercepting", function() {

	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		methodWasCalled = true;
		return proceed();
	};

	beforeEach(function() {
		methodWasCalled = false;
	});

	describe("When we have a named function instance", function() {

		var instance = new builder.dummies.NamedFunc();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept the property getter", function() {
			var result = instance.property;
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = instance.methodWithReturn();
			g.assert(methodWasCalled);
			g.assert(result);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var unInterceptedInstance = new builder.dummies.NamedFunc();
			var actualToString = instance.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			g.assert(actualToString === expectedToString);
		});

	});

	describe("When we have a named function type", function() {

		var InterNamedFunction = 
			scarlet
				.intercept(builder.dummies.NamedFunc)
				.using(interceptor)
				.resolve();

		var instance = new InterNamedFunction();

		it("Then should be able to intercept the constructor", function() {
			var constructorInstance = new InterNamedFunction();
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept the property getter", function() {
			var result = instance.property;
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = instance.methodWithReturn();
			g.assert(methodWasCalled);
			g.assert(result);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = builder.dummies.NamedFunc.toString();
			var interceptedToString = InterNamedFunction.toString();
			g.assert(expectedToString === interceptedToString);
		});
	});

});