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

	describe("When intercepting specific members", function() {

		var InterObjectLiteral = builder.dummies.ObjectLiteral();

		var memberInterceptor =
			scarlet
				.intercept(InterObjectLiteral, "methodWithReturn")
				.using(interceptor);

		it("Then it should intercept calls", function() {
			var result = InterObjectLiteral.methodWithReturn();
			g.assert.equal(result, "any");
			g.assert(methodWasCalled);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = builder.dummies.ObjectLiteral().methodWithReturn.toString();
			var interceptedToString = InterObjectLiteral.methodWithReturn.toString();
			g.assert(expectedToString === interceptedToString);
		});
	});

	describe("When intercepting non-existent members", function() {

		var InterObjectLiteral = builder.dummies.ObjectLiteral();

		it("Then it should throw an exception", function() {
			var didThrowException = false;
			try {
				scarlet
					.intercept(InterObjectLiteral, "unknownMethod")
					.using(interceptor);
			} catch (exception) {
				didThrowException = true;
			}
			g.assert(didThrowException);
		});

	});

});