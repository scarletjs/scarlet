require("../include");

var scarlet = new(require("../lib/scarlet"))();

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

	});

});