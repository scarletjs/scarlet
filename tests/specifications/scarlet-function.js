require("../../include");

var scarlet = new(require("../../lib/scarlet"))();


describe("Given we are intercepting", function() {
	
	var numberOfCalls = 0;
	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		methodWasCalled = true;
		proceed();
		return invocation.result;
	};

	beforeEach(function() {
		numberOfCalls = 0;
		methodWasCalled = false;
	});

	describe("When we have a named function with a return", function() {

		function namedFunctionWithReturn(){
			numberOfCalls++;
			return "any";
		};
		var expectedToString = namedFunctionWithReturn.toString();
		namedFunctionWithReturn = scarlet
								.intercept(namedFunctionWithReturn)
								.using(interceptor)
								.resolve();

		it("Then should be able to intercept", function() {
			namedFunctionWithReturn();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = namedFunctionWithReturn();
			assert(methodWasCalled);
			assert(result);
		});

		it("Then should be able to intercept method with return value", function() {
			namedFunctionWithReturn();
			assert(methodWasCalled);
			assert(numberOfCalls === 1);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var actualToString = namedFunctionWithReturn.toString();
			assert(actualToString === expectedToString);
		});

	});

	describe("When we have an unnamed function with a return", function() {
		
		var unNamedFunctionWithReturn =function (){
			numberOfCalls++;
			return "any";
		};
		var expectedToString = unNamedFunctionWithReturn.toString();
		unNamedFunctionWithReturn = scarlet
								.intercept(unNamedFunctionWithReturn)
								.using(interceptor)
								.resolve();

		it("Then should be able to intercept", function() {
			unNamedFunctionWithReturn();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = unNamedFunctionWithReturn();
			assert(methodWasCalled);
			assert(result);
		});

		it("Then should be able to intercept method with return value", function() {
			unNamedFunctionWithReturn();
			assert(methodWasCalled);
			assert(numberOfCalls === 1);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var actualToString = unNamedFunctionWithReturn.toString();
			assert(actualToString === expectedToString);
		});
	});

});