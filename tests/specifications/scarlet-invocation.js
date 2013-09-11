require("../../include");

var scarlet = new(require("../../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	var invocationObj = null;
	var interceptedObj = null;
	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		interceptedObj = this;
		invocationObj = invocation;
		methodWasCalled = true;
		return proceed();
	};

	beforeEach(function() {
		invocationObj = null;
		interceptedObj = null;
		methodWasCalled = false;
	});

	describe("When intercepting a named function instance", function() {
		
		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName == 'NamedFunction');
		});

	});

	describe("When intercepting a prototype function instance", function() {

		var instance = new PrototypeFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'PrototypeFunction');
		});

	});

	describe("When intercepting an unamed function instance", function() {

		var instance = new UnnamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'Object');
		});

	});

	describe("When intercepting a specific member of a named function instance", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance, 'method')
			.using(interceptor);

		it("Then should return name of intercepted function", function() {
			instance.method();
			assert(invocationObj.methodName === 'method');
		});

		it("Then should return name of intercepted object", function() {
			instance.method();
			assert(invocationObj.objectName === 'NamedFunction');
		});
	});

	describe("When intercepting a named function", function() {

		function functionWithName() {}

		functionWithName = scarlet
							.intercept(functionWithName)
							.using(interceptor)
							.resolve();

		it("Then should return name of intercepted function", function() {
			functionWithName();
			assert(invocationObj.methodName === 'functionWithName');
		});

		it("Then should return name of intercepted function as object name", function() {
			functionWithName();
			assert(invocationObj.objectName === 'functionWithName');
		});
	});

	describe("When intercepting an unnamed function", function() {

		var unNamed = function() {}

		unNamed = scarlet
					.intercept(unNamed)
					.using(interceptor)
					.resolve();

		it("Then should return default name for a function", function() {
			unNamed();
			assert(invocationObj.methodName === 'Function');
		});

		it("Then should return default name for a function as object name", function() {
			unNamed();
			assert(invocationObj.objectName === 'Function');
		});
	});

});