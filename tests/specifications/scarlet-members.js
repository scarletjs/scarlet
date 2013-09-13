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

	describe("When intercepting specific members", function() {

		var InterObjectLiteral = Object.create(ObjectLiteral);

		var memberInterceptor =
			scarlet
				.intercept(InterObjectLiteral, "methodWithReturn")
				.using(interceptor);

		it("Then it should intercept calls", function() {
			var result = InterObjectLiteral.methodWithReturn();
			assert.equal(result, "any");
			assert(methodWasCalled);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = ObjectLiteral.methodWithReturn.toString();
			var interceptedToString = InterObjectLiteral.methodWithReturn.toString();
			assert(expectedToString === interceptedToString);
		});
	});

	describe("When intercepting non-existent members", function() {

		var InterObjectLiteral = Object.create(ObjectLiteral);

		it("Then it should throw an exception", function() {
			var didThrowException = false;
			try {
				scarlet
					.intercept(InterObjectLiteral, "unknownMethod")
					.using(interceptor);
			} catch (exception) {
				didThrowException = true;
			}
			assert(didThrowException);
		});

	});

});