require("../../include");

var scarlet = new(require("../../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	describe("When intercepting a named function", function() {
		
		var invocationObj = null;
		var interceptedObj = null;
		var methodWasCalled = false;

		function interceptor(proceed, invocation) {
			interceptedObj = this;
			invocationObj = invocation;
			methodWasCalled = true;
			return proceed();
		};

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		instance.methodWithReturn();

		it("Then should return name of intercepted function", function() {
			assert(invocationObj.methodName === 'methodWithReturn');
		});

		it("Then should return name of intercepted object", function() {
			assert(interceptedObj == instance);
		});

	});
	/*
	describe("When intercepting a prototype function", function() {

		var invocationObj = null;
		var methodWasCalled = false;

		function interceptor(proceed, invocation) {
			invocationObj = invocation;
			methodWasCalled = true;
			return proceed();
		};

		var instance = new PrototypeFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		instance.method();

		it("Then should return name of intercepted function", function() {
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			assert(invocationObj.objectName === 'PrototypeFunction');
		});

	});

	describe("When intercepting an unamed function", function() {

		var invocationObj = null;
		var methodWasCalled = false;

		function interceptor(proceed, invocation) {
			invocationObj = invocation;
			methodWasCalled = true;
			return proceed();
		};

		var instance = new UnnamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		instance.method();

		it("Then should return name of intercepted function", function() {
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			assert(invocationObj.objectName === 'Object');
		});

	});

	describe("When getting method name using an unnamed interceptor", function() {

		var invocationObj = null;
		var methodWasCalled = false;

		function interceptor(proceed, invocation) {
			invocationObj = invocation;
			methodWasCalled = true;
			return proceed();
		};

		var NamedFunctionInter = function() {}
		NamedFunctionInter.method = function() {};

		it("Then should return name of intercepted function", function(done) {

			var interceptor = function(proceed, invocation) {
				assert(invocation.methodName === 'method');
				done();
			};

			scarlet
				.intercept(NamedFunctionInter, 'method')
				.using(interceptor);

			NamedFunctionInter.method();
		});

	});
	*/
});