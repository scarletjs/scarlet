var l = console.log;
var i = require("util").inspect;
var assert = require("assert");

var scarlet = require("../lib");

ObjectLiteral = require("./dummies/object-literal");
NamedFunction = require("./dummies/named-function");
UnnamedFunction = require("./dummies/unnamed-function");
PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	var methodWasCalled = false;

	function interceptor(invocation) {
		var result = invocation.proceed();
		methodWasCalled = true;
		return result;
	};

	beforeEach(function() {
		methodWasCalled = false;
	});

	describe("When we have an object literal instance", function() {

		var instance = ObjectLiteral;

		scarlet
			.intercept(instance)
			.asInstance()
			.using(interceptor);

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

	describe("When we have a named function instance", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.asInstance()
			.using(interceptor);

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

		NamedFunction = scarlet.intercept(NamedFunction)
			.asType().using(interceptor);

		var instance = new NamedFunction();

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

	describe("When we have an unnamed function instance", function() {

		var instance = new UnnamedFunction();

		scarlet
			.intercept(instance)
			.asInstance()
			.using(interceptor);

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

		UnnamedFunction = scarlet.intercept(UnnamedFunction)
			.asType().using(interceptor);

		var instance = new UnnamedFunction();

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

	describe("When we have a prototype function instance", function() {

		var instance = new PrototypeFunction();

		scarlet
			.intercept(instance)
			.asInstance()
			.using(interceptor);

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

	});

	describe("When we have a prototype function type", function() {

		PrototypeFunction = scarlet.intercept(PrototypeFunction)
			.asType().using(interceptor);

		var instance = new PrototypeFunction();

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

	});

	describe("When doing an object interceptor", function() {

		describe("When working with a simple object", function() {

			it("Should intercept correctly", function() {

				var interceptor = function(invocation) {

					invocation.proceed();

				};

				function AnyObject() {

					var self = this;

					self.method = function() {
					};
				};

				AnyObject = scarlet.intercept(AnyObject).asType().using(interceptor);

				var anyObject = new AnyObject();

				anyObject.method();

			});

		});

	});

});
