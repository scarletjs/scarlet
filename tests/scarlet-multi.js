require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

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
			assert(firstMethodCalled);
		});

		it("Then the second interceptor should be called", function() {
			assert(secondMethodCalled);
		});

	});
});