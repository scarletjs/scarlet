var g = require("../../include");
var dummies = require("./dummies");
var Scarlet = require("../../lib/scarlet");

var scarlet = new Scarlert();

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

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept the property getter", function() {
			var result = instance.property;
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var unInterceptedInstance = new NamedFunction();
			var actualToString = instance.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When we have a named function type", function() {

		var InterNamedFunction = 
			scarlet
				.intercept(NamedFunction)
				.using(interceptor)
				.resolve();

		var instance = new InterNamedFunction();

		it("Then should be able to intercept the constructor", function() {
			var constructorInstance = new InterNamedFunction();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept the property getter", function() {
			var result = instance.property;
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = NamedFunction.toString();
			var interceptedToString = InterNamedFunction.toString();
			assert(expectedToString === interceptedToString);
		});
	});

});