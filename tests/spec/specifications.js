var assert = require("assert");
var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");
var enumerable = require("../../lib/extensions/enumerable");

describe("Given we are using scarlet", function() {
	var scarlet = new Scarlet();

	describe("When intercepting method with a return", function() {
		var methodWithReturnBuilder =  builder.for(scarlet)
												.withAllInstanceTypes()
												.withCallbackInterceptor()
												.forMethodWithReturn();

		enumerable.forEach(methodWithReturnBuilder.instances,function(instance){

			describe("When instance:"+instance.name,function(){
				before(function(){
					instance.methodWithReturn();	
				});

				after(function(){
					methodWithReturnBuilder.reset();
				});

				it("Should call method with return",function(){
					assert(instance.methodWithReturn.called);
				});

				enumerable.forEach(methodWithReturnBuilder.interceptors,function(interceptor){
					describe('When using interceptor:'+interceptor.name,function(){
						it("Should call interceptor",function(){
							assert(interceptor.spy.called);
						});

						it("Should call interceptor once for each intercepted member",function(){
							assert(interceptor.spy.callCount === 1);
						});

						it("Callback should return intercepted method return",function(){
							assert(interceptor.spy.result === 'any');
						});
					});
				});
			});
		});
	});

	describe("When intercepting method", function() {
		var methodWithReturnBuilder =  builder.for(scarlet)
												.withNamedFunction()
												.withCallbackInterceptor()
												.forMethod();

		enumerable.forEach(methodWithReturnBuilder.instances,function(instance){
			beforeEach(function(){
				methodWithReturnBuilder.reset();
				instance.method();
			});

			describe("When instance:"+instance.name,function(){
				it("Should call method with return",function(){
					assert(instance.methodCalled);
				});

				enumerable.forEach(methodWithReturnBuilder.interceptors,function(interceptor){
					describe('When using interceptor:'+interceptor.name,function(){
						it("Should call interceptor",function(){
							assert(interceptor.spy.called);
						});

						it("Should call interceptor once for each intercepted member",function(){
							assert(interceptor.spy	.callCount === 1);
						});
					});
				});
			});
		});
	});

	// describe("When intercepting property", function() {
	// 	var methodWithReturnBuilder =  builder.for(scarlet)
	// 								.withNamedFunction()
	// 								.withCallbackInterceptor()
	// 								.forProperty();

	// 	enumerable.forEach(methodWithReturnBuilder.instances,function(instance){
	// 		var propertyValue;
	// 		beforeEach(function(){
	// 			methodWithReturnBuilder.reset();
	// 			propertyValue = instance.property;
	// 		});

	// 		describe("When instance:"+instance.name,function(){
	// 			it("Should call method with return",function(){
	// 				assert(propertyValue === 'any');
	// 			});

	// 			enumerable.forEach(methodWithReturnBuilder.interceptors,function(interceptor){
	// 				describe('When using interceptor:'+interceptor.name,function(){
	// 					it("Should call interceptor",function(){
	// 						assert(interceptor.spy.called);
	// 					});

	// 					it("Should call interceptor once for each intercepted member",function(){
	// 						assert(interceptor.spy	.callCount === 1);
	// 					});
	// 				});
	// 			});
	// 		});
	// 	});
	// });

	// describe("When invoking all kinds of instances", function() {

	// 	var assertThat =
	// 		builder.for(scarlet)
	// 			.withInstances()
	// 			//.withInterceptors()
	// 			.withCallbackInterceptor()
	// 			.invokeAll()
	// 			.assert();

	// 	it("Then we should be able to verify all methods were invoked", function() {
	// 		assertThat.allInvoked();
	// 	});

	// });

	describe("When intercepting Math.min", function() {
		var original = Math.min;
		beforeEach(function(){
			Math.min = original;
		});
		it("Should call out to the interceptor", function() {

			var interceptorCalled = false;
			
			Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
				.using(function(proceed) {
					proceed();
					interceptorCalled = true;
				}).proxy();

			var result = Math.min(1, 2, 3);
			
			assert(result === 1, "Function is broken, should return '1'");
			assert(interceptorCalled, "The interceptor was not called for Math.min");

		});

		it("Should be able to override results", function() {

			var interceptorCalled = false;

			Math.min = scarlet.intercept(Math.min, scarlet.FUNCTION)
								.using(function(proceed) {
									interceptorCalled = true;
									var result = proceed(null,3);
								}).proxy();

			var result = Math.min(1, 2, 3);

			assert(result === 3, "Function is broken, should return '1'");
			assert(interceptorCalled, "The interceptor was not called for Math.min");

		});

	});

	describe("When intercepting an entire object", function() {

		it("Should call out to an interceptor for all methods and properties", function() {

			var interceptorTimesCalled = 0;

			function someInterceptor(proceed) {
				// 'Prelude Code' or 'Before Advice'
				var result = proceed();// 'Target Method' or 'Join Point'
				interceptorTimesCalled += 1;
				// 'Postlude Code' or 'After Advice'
				return result;
			}

			var someFunction = function() {
				var self = this;
				self.memberProperty1 = "any";
				self.memberFunction1 = function() {};
				self.memberFunction2 = function() {};
			};

			someFunction = scarlet.intercept(someFunction) //-> memberFunction1 and 2 will now be intercepted
				.using(someInterceptor)
				.proxy();

			var instance = new someFunction();
			instance.memberProperty1 = "other";
			instance.memberFunction1();
			instance.memberFunction2();

			assert(interceptorTimesCalled === 4);

		});

	});

});
