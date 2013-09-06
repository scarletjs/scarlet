require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are using an asynchronous interceptor", function() {

	var interceptorCalled = false;

	beforeEach(function() {
		interceptorCalled = false;
	});

	var asyncInterceptor = function(proceed, invocation) {
		process.nextTick(function(){
			interceptorCalled = true;
			proceed();
		});
	};

	describe("When telling scarlet it is asynchronous", function() {

		var instance = new NamedFunction();

		scarlet
			.interceptAsync(instance)
			.using(asyncInterceptor);

		it("Then it should be called", function(done) {
			var result = instance.methodWithReturn();
			setTimeout(function() {
				assert(interceptorCalled);
				done();
			}, 10);
		});

		it("Then it should not have a result", function() {
			var result = instance.methodWithReturn();
			assert(result == null);
		});

		it("Then it should not execute immediately", function(){
			instance.methodWithReturn();
			assert(!interceptorCalled);
		});

	});

	describe("When telling scarlet it is synchronous", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(asyncInterceptor);

		it("Then it should be called", function(done) {
			var result = instance.methodWithReturn();
			setTimeout(function() {
				assert(interceptorCalled);
				done();
			}, 10);
		});

		it("Then there should always be a result", function() {
			var result = instance.methodWithReturn();
			assert(result === "any");
			assert(!interceptorCalled);
		});

	});

});