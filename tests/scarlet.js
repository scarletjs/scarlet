var l = console.log;
var i = require("util").inspect;
var assert = require("assert");

var scarlet = new (require("../lib/scarlet"))();

ObjectLiteral = require("./dummies/object-literal");
NamedFunction = require("./dummies/named-function");
UnnamedFunction = require("./dummies/unnamed-function");
PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	var methodWasCalled = false;

	function interceptor(proceed,invocation) {

		var result = proceed();
		methodWasCalled = true;
		return result;
	};

	var method2WasCalled = false;

	function interceptor2(proceed, invocation) {
		var result = proceed();
		method2WasCalled = true;
		return result;
	};

	beforeEach(function() {
		methodWasCalled = false;
		method2WasCalled = false;
	});

	describe("When using interceptor events", function() {

		var doneEventWasCalled = false;
		var afterEventWasCalled = false;
		var beforeEventWasCalled = false;

		beforeEach(function() {
			doneEventWasCalled = false;
			afterEventWasCalled = false;
			beforeEventWasCalled = false;
		});

		describe("When using beforeEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('before',function(invocation){
					beforeEventWasCalled = true;
				});

			it("Then should call before event", function() {
				var result = instance.method();
				assert(beforeEventWasCalled);
			});
		});

		describe("When using afterEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('after',function(invocation){
					afterEventWasCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(afterEventWasCalled);
			});
		});

		describe("When using doneEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('done',function(invocation){
					doneEventWasCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(doneEventWasCalled);
			});
		});

	});

	describe("When interceptor has an asynchronous call", function() {
		var asyncInterceptorWasCalled = false;

		function asyncInterceptor(proceed,invocation) {
			setTimeout(function() {
				proceed();
				asyncInterceptorWasCalled = true;

			}, 1);
		};

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(asyncInterceptor);
		
		it("Then should be able to intercept", function(done) {
			var result = instance.methodWithReturn();

			setTimeout(function() {
				assert(asyncInterceptorWasCalled);
				done();	
			}, 10);

		});

		it("Then should be able to intercept", function(done) {
			var result = instance.methodWithReturn();
			assert(result === "any");
			done();
		});

	});

	describe("When using multiple interceptors", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept", function() {
			var result = instance.method();
			assert(methodWasCalled);

		});

	});

	describe("When we have an object literal instance", function() {

		var instance = Object.create(ObjectLiteral);
		instance.property = ObjectLiteral.property;

		scarlet
			.intercept(instance)
			.using(interceptor);	

		it("Then should be able to intercept the property getter", function() {

			var result = instance.property;
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method with return value", function() {

			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);

		});

	});

	describe("When we have a named function instance", function() {

		var instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept the property getter", function() {

			var result = instance.property;
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method with return value", function() {

			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);

		});

	});

	describe("When we have a named function type", function() {

		var InterNamedFunction = scarlet.intercept(NamedFunction)
								.using(interceptor)
								.resolve();

		var instance = new InterNamedFunction();

		it("Then should be able to intercept the constructor", function() {
			
			var constructorInstance = new InterNamedFunction();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept the property getter", function() {

			var result = instance.property;
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method with return value", function() {

			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);

		});

	});

	describe("When we have an unnamed function instance", function() {

		var instance = new UnnamedFunction();

		scarlet
			.intercept(instance)
			.using(interceptor);

		it("Then should be able to intercept the property getter", function() {

			var result = instance.property;
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method with return value", function() {

			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);

		});

	});

	describe("When we have an unnamed function type", function() {

		var InterUnnamedFunction = scarlet.intercept(UnnamedFunction)
											.using(interceptor)
											.resolve();

		var instance = new InterUnnamedFunction();

		it("Then should be able to intercept the constructor", function() {

			var constructorInstance = new InterUnnamedFunction();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept the property getter", function() {

			var result = instance.property;
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method", function() {

			instance.method();
			assert(methodWasCalled);

		});

		it("Then should be able to intercept method with return value", function() {

			var result = instance.methodWithReturn();
			assert(methodWasCalled);
			assert(result);

		});

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

		var InterPrototypeFunc = scarlet.intercept(PrototypeFunction)
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

	});

	describe("When we have a prototype function instance", function() {
		describe("When intercepted method uses an instance property", function() {

			var InterPrototypeFunc = scarlet.intercept(PrototypeFunction)
										.using(interceptor)
										.resolve();

			var instance = new InterPrototypeFunc();

			it("Then should be able to use it", function() {

				var result = instance.methodUsingInstanceProperty();

				assert.equal(result,instance.anyInstanceProperty);
				assert.notEqual(result,undefined);
			});
		});

	});

	describe('When defining an interceptor for a method that is already intercepted', function(){
		var instance = new PrototypeFunction();

		scarlet.intercept(instance)
				.using(interceptor);

		it('should throw an exception',function(){

			var didThrowException = false;

			try{
				scarlet.intercept(instance)
						.using(interceptor);

			}catch(exception){
				didThrowException = true;
			}

			assert(didThrowException);
		});
	});

	describe("When we have a prototype function instance", function() {
		describe("When intercepted method uses an instance property", function() {
			
			var instance = new PrototypeFunction();

			scarlet.intercept(instance)
					.using(interceptor);


			it("Then should be able to use it", function() {

				var result = instance.methodUsingInstanceProperty();

				assert.equal(result,instance.anyInstanceProperty);
				assert.notEqual(result,undefined);
			});
		});

	});
	
	describe("When intercepting specific members", function() {
		var InterObjectLiteral = Object.create(ObjectLiteral);

		var memberInterceptor = scarlet.intercept(InterObjectLiteral,"methodWithReturn")
										.using(interceptor);

		it("should intercept correctly",function(){

			var result = InterObjectLiteral.methodWithReturn();
			assert.equal(result,"any");
			assert(methodWasCalled);
		});

	});

	describe("When doing an object interceptor", function() {

		describe("When working with a simple object", function() {

			it("Should intercept correctly", function() {

				var interceptor = function(proceed) {

					proceed();

				};

				function AnyObject() {

					var self = this;

					self.method = function() {
					};
				};

				var AnyObject = scarlet.intercept(AnyObject)
									.using(interceptor)
									.resolve();

				var anyObject = new AnyObject();

				anyObject.method();

			});

		});

	});

});


