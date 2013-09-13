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

	describe("When we have an unnamed function instance", function() {

		var instance = new UnnamedFunction();

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
			var unInterceptedInstance = new UnnamedFunction();
			var actualToString = instance.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When we have an unnamed function type", function() {

		var InterUnnamedFunction = 
			scarlet
				.intercept(UnnamedFunction)
				.using(interceptor)
				.resolve();

		var instance = new InterUnnamedFunction();

		it("Then should be able to intercept the constructor", function() {
			var constructorInstance = new InterUnnamedFunction();
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
			var expectedToString = UnnamedFunction.toString();
			var interceptedToString = InterUnnamedFunction.toString();
			assert(expectedToString === interceptedToString);
		});
	});

});