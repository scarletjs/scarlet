require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	var firstMethodCalled = false;

	function firstInterceptor(proceed, invocation) {
		var result = proceed();
		firstMethodCalled = true;
		return result;
	};

	var secondMethodCalled = false;

	function secondInterceptor(proceed, invocation) {
		var result = proceed();
		method2WasCalled = true;
		return result;
	};

	beforeEach(function() {
		firstMethodCalled = false;
		secondMethodCalled = false;
	});

	var instance = new NamedFunction();

	scarlet
		.intercept(instance)
		.using(interceptor);

	describe("When using multiple interceptors", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept", function() {
			var result = instance.method();
			assert(methodWasCalled);
		});

	});
});