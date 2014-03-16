var g = require("../../include");
var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");

describe("Given we are using scarlet", function() {

	var scarlet = new Scarlet();

	describe("When invoking all kinds of instances", function() {

		var assertThat =
			builder.for (scarlet)
				.withInstances()
				.withInterceptor()
				.invokeAll()
				.assert();

		it("Then we should be able to verify all methods were invoked", function() {
			assertThat.allInvoked();
		});

	});

	describe("When intercepting Math.min", function() {

		it("Should call out to the interceptor", function() {

			var interceptorCalled = false;

			Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
				.using(function(info, method, args) {
					var result = method.call(this, info, method, args);
					interceptorCalled = true;
					return result;
				}).proxy();

			var result = Math.min(1, 2, 3);

			g.assert(result === 1, "Function is broken, should return '1'");
			g.assert(interceptorCalled, "The interceptor was not called for Math.min");

		});

		it("Should be able to override results", function() {

			var interceptorCalled = false;

			Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
				.using(function(info, method, args) {
					interceptorCalled = true;
					return 3;
				}).proxy();

			var result = Math.min(1, 2, 3);

			g.assert(result === 3, "Function is broken, should return '1'");
			g.assert(interceptorCalled, "The interceptor was not called for Math.min");

		});

	});

	describe("When intercepting an entire object", function() {

		it("Should call out to an interceptor for all methods and properties", function() {

			var interceptorTimesCalled = 0;

			function someInterceptor(info, method, args) {
				// 'Prelude Code' or 'Before Advice'
				var result = method.call(this, info, method, args); // 'Target Method' or 'Join Point'
				interceptorTimesCalled += 1;
				// 'Postlude Code' or 'After Advice'
				return result;
			}

			function someFunction() {
				var self = this;
				self.memberProperty1 = "any";
				self.memberFunction1 = function() {};
				self.memberFunction2 = function() {};
			}

			someFunction = scarlet.intercept(someFunction, scarlet.PROTOTYPE) //-> memberFunction1 and 2 will now be intercepted
				.using(someInterceptor)
				.proxy();

			var instance = new someFunction();
			instance.memberProperty1 = "other";
			instance.memberFunction1();
			instance.memberFunction2();

			g.assert(interceptorTimesCalled === 4);

		});

	});

});
