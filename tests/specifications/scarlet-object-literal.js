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

	describe("When we have an object literal instance", function() {

		var instance = builder.dummies.ObjectLiteral();
		instance.property = builder.dummies.ObjectLiteral().property;

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
			var actualToString = instance.method.toString();
			var expectedToString = builder.dummies.ObjectLiteral().method.toString();
			g.assert(actualToString === expectedToString);
		});

	});

});