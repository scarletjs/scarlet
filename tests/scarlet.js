var l = console.log;
var i = require("util").inspect;
var assert = require("assert");

var scarlet = require("../lib/scarlet");

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
			.interceptObject(instance)
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
			.interceptObject(instance)
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

		NamedFunction = scarlet.interceptType(NamedFunction)
			.using(interceptor);

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
			.interceptObject(instance)
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

		UnnamedFunction = scarlet.interceptType(UnnamedFunction)
			.using(interceptor);

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
			.interceptObject(instance)
			.using(interceptor);

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

	});

	describe("When we have a prototype function type", function() {

		PrototypeFunction = scarlet.interceptType(PrototypeFunction)
			.using(interceptor);

		var instance = new PrototypeFunction();

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

	});


	describe("When we have a prototype function instance", function() {
		describe("When intercepted method uses an instance property", function() {

			PrototypeFunction = scarlet.interceptType(PrototypeFunction)
				.using(interceptor);

			var instance = new PrototypeFunction();

			it("Then should be able to use it", function() {

				var result = instance.methodUsingInstanceProperty();

				assert.equal(result,instance.anyInstanceProperty);
				assert.notEqual(result,undefined);
			});
		});

	});



	describe("When we have a prototype function instance", function() {
		describe("When intercepted method uses an instance property", function() {
			
			var instance = new PrototypeFunction();

			PrototypeFunction = scarlet.interceptObject(instance)
				.using(interceptor);

			it("Then should be able to use it", function() {

				var result = instance.methodUsingInstanceProperty();

				assert.equal(result,instance.anyInstanceProperty);
				assert.notEqual(result,undefined);
			});
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

				AnyObject = scarlet.interceptType(AnyObject)
					.using(interceptor);

				var anyObject = new AnyObject();

				anyObject.method();

			});

		});

	});

});
