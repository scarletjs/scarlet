var g = require("../../include");
var dummies = require("./dummies");
var Scarlet = require("../../lib/scarlet");

var scarlet = new Scarlert();

describe("Given we are using more than one interceptor", function() {

	var firstMethodCalled = false;

	function firstInterceptor(proceed, invocation) {
		firstMethodCalled = true;
		return proceed();
	};

	var secondMethodCalled = false;

	function secondInterceptor(proceed, invocation) {
		secondMethodCalled = true;
		return proceed();
	};

	var instance = new NamedFunction();

	scarlet
		.intercept(instance)
		.using(firstInterceptor)
		.using(secondInterceptor);

	describe("When executing an intance method", function() {

		var result = instance.method();

		it("Then the first interceptor should be called", function() {
			assert(firstMethodCalled, "First method was not called");
		});

		it("Then the second interceptor should be called", function() {
			assert(secondMethodCalled, "Second method was not called");
		});

	});

	describe("When attempting to intercept already intercepted objects", function() {
		
		it("Then it should throw an exception", function() {
			var exceptionThrown = false;
			try {
				scarlet
					.intercept(instance)
					.using(firstInterceptor);
			} catch (ex) {
				exceptionThrown = true;
			}
			assert(exceptionThrown, "Did not throw exception when trying to intercept more than once");
		});
	
	});

});