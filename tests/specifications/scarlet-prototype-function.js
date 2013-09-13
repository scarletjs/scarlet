var g = require("../../include");
var dummies = require("./dummies");
var Scarlet = require("../../lib/scarlet");

var scarlet = new Scarlert();

describe("Given we are intercepting", function() {

	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		methodWasCalled = true;
		return proceed();
	};

	beforeEach(function() {
		methodWasCalled = false;
	});

	describe("When we have a prototype function instance", function() {

		var instance = new PrototypeFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept method", function() {
			instance.method();
			assert(methodWasCalled);
		});

	});

	describe("When we have a prototype function type", function() {

		var InterPrototypeFunc = 
			scarlet
				.intercept(PrototypeFunction)
				.using(interceptor)
				.resolve();

		var instance = new InterPrototypeFunc();

		it("Then should be able to intercept the constructor", function() {
			var constructorInstance = new InterPrototypeFunc();
			assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			assert(methodWasCalled);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = PrototypeFunction.toString();
			var interceptedToString = InterPrototypeFunc.toString();
			assert(expectedToString === interceptedToString);
		});
	});

	describe("When we have a prototype function instance", function() {
		
		describe("When intercepted method uses an instance property", function() {

			var InterPrototypeFunc = 
				scarlet
					.intercept(PrototypeFunction)
					.using(interceptor)
					.resolve();

			var instance = new InterPrototypeFunc();

			it("Then should be able to use it", function() {
				var result = instance.methodUsingInstanceProperty();
				assert.equal(result, instance.anyInstanceProperty);
				assert.notEqual(result, undefined);
			});

		});

	});

	describe("When we have a prototype function instance", function() {
		
		describe("When intercepted method uses an instance property", function() {

			var instance = new PrototypeFunction();

			scarlet.intercept(instance)
				.using(interceptor);

			it("Then should be able to use it", function() {
				var result = instance.methodUsingInstanceProperty();
				assert.equal(result, instance.anyInstanceProperty);
				assert.notEqual(result, undefined);
			});
			
		});

	});

});