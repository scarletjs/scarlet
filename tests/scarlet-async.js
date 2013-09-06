require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are using scarlet with an sync/async methods", function() {

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

	describe("When interceptor is asynchronous and scarlet interceptor is asynchronous", function() {

		var instance = new NamedFunction();

		scarlet
			.interceptAsync(instance)
			.using(asyncInterceptor);

		it("Then should call interceptor", function(done) {
			var result = instance.methodWithReturn();
			setTimeout(function() {
				assert(interceptorCalled);
				done();
			}, 10);
		});

		it("Then intercepted method should be called before interceptor", function(done) {
			var result = instance.methodWithReturn();
			assert(result == null);
			assert(!interceptorCalled);
			done();
		});

	});

	describe("When interceptor is asynchronous and scarlet interceptor is synchronous", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(asyncInterceptor);

		it("Then should call interceptor", function(done) {
			var result = instance.methodWithReturn();
			setTimeout(function() {
				assert(interceptorCalled);
				done();
			}, 10);
		});

		it("Then intercepted method should be called before interceptor", function(done) {
			var result = instance.methodWithReturn();
			assert(result === "any");
			assert(!interceptorCalled);
			done();
		});

	});

});