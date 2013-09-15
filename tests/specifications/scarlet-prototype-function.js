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

	describe("When we have a prototype function instance", function() {

		var instance = new builder.dummies.PrototypeFunc();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept method", function() {
			instance.method();
			g.assert(methodWasCalled);
		});

	});

	describe("When we have a prototype function type", function() {

		var InterPrototypeFunc = 
			scarlet
				.intercept(builder.dummies.PrototypeFunc)
				.using(interceptor)
				.resolve();

		var instance = new InterPrototypeFunc();

		it("Then should be able to intercept the constructor", function() {
			var constructorInstance = new InterPrototypeFunc();
			g.assert(methodWasCalled);
		});

		it("Then should be able to intercept method", function() {
			instance.method();
			g.assert(methodWasCalled);
		});

		it("Then should be able to get intercepted method as a string", function() {
			var expectedToString = builder.dummies.PrototypeFunc.toString();
			var interceptedToString = InterPrototypeFunc.toString();
			g.assert(expectedToString === interceptedToString);
		});
	});

	describe("When we have a prototype function instance", function() {
		
		describe("When intercepted method uses an instance property", function() {

			var InterPrototypeFunc = 
				scarlet
					.intercept(builder.dummies.PrototypeFunc)
					.using(interceptor)
					.resolve();

			var instance = new InterPrototypeFunc();

			it("Then should be able to use it", function() {
				var result = instance.methodUsingInstanceProperty();
				g.assert.equal(result, instance.anyInstanceProperty);
				g.assert.notEqual(result, undefined);
			});

		});

	});

	describe("When we have a prototype function instance", function() {
		
		describe("When intercepted method uses an instance property", function() {

			var instance = new builder.dummies.PrototypeFunc();

			scarlet.intercept(instance)
				.using(interceptor);

			it("Then should be able to use it", function() {
				var result = instance.methodUsingInstanceProperty();
				g.assert.equal(result, instance.anyInstanceProperty);
				g.assert.notEqual(result, undefined);
			});
			
		});

	});

});