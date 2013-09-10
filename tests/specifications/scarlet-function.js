require("../../include");

var scarlet = new(require("../../lib/scarlet"))();


describe("Given we are intercepting", function() {
	
	var numberOfCalls = 0;

	var functionWithReturn =function (){
		numberOfCalls++;
		return "any";
	};

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

	describe("When we have a function with a return", function() {

		functionWithReturn = scarlet
								.intercept(functionWithReturn)
								.using(interceptor)
								.resolve();

		it("Then should be able to intercept", function() {
			functionWithReturn();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = functionWithReturn();
			assert(methodWasCalled);
			assert(result);
		});

		it("Then should be able to intercept method with return value", function() {
			functionWithReturn();
			assert(methodWasCalled);
			assert(numberOfCalls === 1);
		});

	});

});