var g = require("../../include");
var builders = require("./builders");
var Scarlet = require("../../lib/scarlet");

var scarlet = new Scarlet();


describe("Given we are using async interceptors", function() {

	describe("When calling done from an async interceptor", function() {

		it("Then it should be called", function() {

			var builder = 
				builders
					.for(scarlet)
					.withNamedFunction()
					.withInterceptor()
					.invokeMethod()
					.assert()
					.methodCalled();

		});

	});

});
/*
describe("Given we are using async interceptors", function() {

	var invocationObject = null;
	var interceptorCalled = false;

	beforeEach(function() {
		interceptorCalled = false;
	});

	var asyncInterceptor = function(proceed, invocation, done) {
		invocationObject = invocation;
		process.nextTick(function(){
			interceptorCalled = true;
			var result = proceed();
			done(result);
		});
	};

	describe("When calling done from an async interceptor", function() {

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

		it("Then it should not have an immediate result", function() {
			var result = instance.methodWithReturn();
			assert(result == null);
		});

		it("Then it should have an eventual result", function(done) {
			var result = instance.methodWithReturn();
			setTimeout(function() {
				assert(invocationObject.result == "any");
				done();
			}, 10);
		});

		it("Then it should not execute immediately", function(){
			instance.methodWithReturn();
			assert(!interceptorCalled);
		});

	});

	describe("When not calling done from an interceptor", function(){

		var firstMethodCalled = false;
		var secondMethodCalled = false;
		var instance = new NamedFunction();

		var firstInterceptor = function(proceed, invocation, done) {
			firstMethodCalled = true;
			return proceed();
		};

		var secondInterceptor = function(proceed, invocation, done) {
			secondMethodCalled = true;
		};

		scarlet
			.intercept(instance)
			.using(firstInterceptor)
			.using(secondInterceptor);

		var result = instance.methodWithReturn();

		it("Then should only call the first method", function(){
			assert(result == "any");
			setTimeout(function(){
				assert(firstMethodCalled);
				assert(!secondMethodCalled);
			}, 10)
		})

	});

});
*/