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

	describe("When we have an object literal instance", function() {

		var instance = Object.create(ObjectLiteral);
		instance.property = ObjectLiteral.property;

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
			var actualToString = instance.method.toString();
			var expectedToString = ObjectLiteral.method.toString();
			assert(actualToString === expectedToString);
		});

	});

});