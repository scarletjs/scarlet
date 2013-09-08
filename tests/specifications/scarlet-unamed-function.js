require("../../include");

var scarlet = new(require("../../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

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

	});

});