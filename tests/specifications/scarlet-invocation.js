var g = require("../../include");
var builder = require("./builders");

var Scarlet = require("../../lib/scarlet")
var scarlet = new Scarlet();

describe("Given we are intercepting", function() {

	var invocationObj = null;
	var interceptedObj = null;
	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		interceptedObj = this;
		invocationObj = invocation;
		methodWasCalled = true;
		return proceed();
	};

	beforeEach(function() {
		invocationObj = null;
		interceptedObj = null;
		methodWasCalled = false;
	});

	describe("When intercepting a named function instance", function() {

		var instance = new builder.dummies.NamedFunc();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName == 'builder.dummies.NamedFunc');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			instance.method();
			var unInterceptedInstance = new builder.dummies.NamedFunc();
			var actualToString = invocationObj.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When intercepting a prototype function instance", function() {

		var instance = new builder.dummies.PrototypeFunc();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'PrototypeFunction');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			instance.method();
			var unInterceptedInstance = new PrototypeFunction();
			var actualToString = invocationObj.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When intercepting an unamed function instance", function() {

		var instance = new builder.dummies.UnnamedFunc();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'Object');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			instance.method();
			var unInterceptedInstance = new Unbuilder.dummies.NamedFunc();
			var actualToString = invocationObj.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When intercepting a specific member of a named function instance", function() {

		var instance = new builder.dummies.NamedFunc();

		scarlet
			.intercept(instance, 'method')
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'builder.dummies.NamedFunc');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			instance.method();
			var unInterceptedInstance = new builder.dummies.NamedFunc();
			var actualToString = invocationObj.method.toString();
			var expectedToString = unInterceptedInstance.method.toString();
			assert(actualToString === expectedToString);
		});
	});

	describe("When intercepting a named function", function() {

		function functionWithName() {}
		var expectedToString = functionWithName.toString();

		functionWithName =
			scarlet
				.intercept(functionWithName)
				.using(interceptor)
				.resolve();

		it("Then should return name of intercepted function", function() {
			functionWithName();
			assert(invocationObj.methodName === 'functionWithName');
		});

		it("Then should return name of intercepted function as object name", function() {
			functionWithName();
			assert(invocationObj.objectName === 'functionWithName');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			functionWithName();
			var actualToString = invocationObj.method.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When intercepting an unnamed function", function() {

		var unNamed = function() {}
		var expectedToString = unNamed.toString();

		unNamed = scarlet
			.intercept(unNamed)
			.using(interceptor)
			.resolve();

		it("Then should return default name for a function", function() {
			unNamed();
			assert(invocationObj.methodName === 'Function');
		});

		it("Then should return default name for a function as object name", function() {
			unNamed();
			assert(invocationObj.objectName === 'Function');
		});

		it("Then should be able to get the intercepted method as a string", function() {
			unNamed();
			var actualToString = invocationObj.method.toString();
			assert(actualToString === expectedToString);
		});
	});

});