var g = require("../../include");
var builder = require("./builders");

var Scarlet = require("../../lib/scarlet")
var scarlet = new Scarlet();

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

		function namedFunctionWithReturn() {
			numberOfCalls++;
			return "any";
		};
		var expectedToString = namedFunctionWithReturn.toString();
		namedFunctionWithReturn =
			scarlet
				.intercept(namedFunctionWithReturn)
				.using(interceptor)
				.resolve();

		it("Then should be able to intercept", function() {
			namedFunctionWithReturn();
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = namedFunctionWithReturn();
			g.assert(methodWasCalled);
			g.assert(result);
		});

		it("Then should be able to intercept method with return value", function() {
			namedFunctionWithReturn();
			g.assert(methodWasCalled);
			g.assert(numberOfCalls === 1);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var actualToString = namedFunctionWithReturn.toString();
			g.assert(actualToString === expectedToString);
		});

	});

	describe("When we have an unnamed function with a return", function() {

		var unNamedFunctionWithReturn = function() {
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
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method with return value", function() {
			var result = unNamedFunctionWithReturn();
			g.assert(methodWasCalled);
			g.assert(result);
		});

		it("Then should be able to intercept method with return value", function() {
			unNamedFunctionWithReturn();
			g.assert(methodWasCalled);
			g.assert(numberOfCalls === 1);
		});

		it("Then should be able to get the intercepted method as a string", function() {
			var actualToString = unNamedFunctionWithReturn.toString();
			g.assert(actualToString === expectedToString);
		});
	});

});