require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are intercepting", function() {

	var methodWasCalled = false;

	function interceptor(proceed, invocation) {
		methodWasCalled = true;
		return proceed();
	};

	beforeEach(function() {
		methodWasCalled = false;
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

		var InterNamedFunction = 
			scarlet
				.intercept(NamedFunction)
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

		var InterUnnamedFunction = 
			scarlet
				.intercept(UnnamedFunction)
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

	describe('When defining an interceptor for a method that is already intercepted', function() {
		
		var instance = new PrototypeFunction();
		
		scarlet
			.intercept(instance)
			.using(interceptor);

		it('should throw an exception', function() {
			var didThrowException = false;
			try {
				scarlet.intercept(instance).using(interceptor);
			} catch (exception) {
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
				assert.equal(result, instance.anyInstanceProperty);
				assert.notEqual(result, undefined);
			});
		});

	});

	describe("When intercepting specific members", function() {
		var InterObjectLiteral = Object.create(ObjectLiteral);

		var memberInterceptor =
			scarlet.intercept(InterObjectLiteral, "methodWithReturn")
			.using(interceptor);

		it("should intercept correctly", function() {
			var result = InterObjectLiteral.methodWithReturn();
			assert.equal(result, "any");
			assert(methodWasCalled);
		});

		describe("When member doesn't exist on intercepted object", function() {

			var InterObjectLiteral = Object.create(ObjectLiteral);

			it("should throw error", function() {
				var didThrowException = false;
				try {
					scarlet.intercept(InterObjectLiteral, "unknownMethod").using(interceptor);
				} catch (exception) {
					didThrowException = true;
				}
				assert(didThrowException);
			});


		});

	});

	describe("When using the invocation object", function() {

		describe("When intercepting  a named function", function() {
			
			var resultInvocation = null;

			var instance = new NamedFunction();

			var interceptor = function(proceed, invocation) {
				resultInvocation = invocation;
			};

			scarlet.intercept(instance)
				.using(interceptor);

			instance.methodWithReturn();

			it("Should return name of intercepted function", function() {
				assert(resultInvocation.methodName === 'methodWithReturn');
			});

			it("Should return name of intercepted object", function() {
				assert(resultInvocation.objectName === 'NamedFunction');
			});

		});
		describe("When getting method name for a prototype named function", function() {
			var resultInvocation = null;
			var instance = new PrototypeFunction();
			var interceptor = function(proceed, invocation) {
				resultInvocation = invocation;
			};

			scarlet.intercept(instance)
				.using(interceptor);

			instance.method();

			it("Should return name of intercepted function", function() {
				assert(resultInvocation.methodName === 'method');
			});

			it("Should return name of intercepted object", function() {
				assert(resultInvocation.objectName === 'PrototypeFunction');
			});
		});

		describe("When getting method name for a prototype named function", function() {
			var resultInvocation = null;
			var instance = new UnnamedFunction();
			var interceptor = function(proceed, invocation) {
				resultInvocation = invocation;
			};

			scarlet.intercept(instance)
				.using(interceptor);

			instance.method();
			it("Should return name of intercepted function", function() {
				assert(resultInvocation.methodName === 'method');
			});

			it("Should return Function as the intercepted object name", function() {
				assert(resultInvocation.objectName === 'Object');
			});
		});

		describe("When getting method name for a named function interceptor", function() {

			var NamedFunctionInter = function() {}
			NamedFunctionInter.method = function() {};

			it("Should return name of intercepted function", function(done) {

				var interceptor = function(proceed, invocation) {
					assert(invocation.methodName === 'method');
					done();
				};

				scarlet.intercept(NamedFunctionInter, 'method')
					.using(interceptor);

				NamedFunctionInter.method();
			});

		});


	});


	describe("When intercepting a function with no instance methods", function() {

		var f1 = function() {};
		f1 = scarlet.intercept(f1)
			.using(interceptor).resolve();

		it("Should intercept function", function() {
			f1();
			assert(methodWasCalled);
		});

	});


	describe("When intercepting a function that has arguments", function() {

		var f1 = function(myarg) {};

		it("Should intercept function", function() {
			f1 = scarlet.intercept(f1)
				.using(interceptor).resolve();
			f1();
			assert(methodWasCalled);
		});

		it("Should intercept function", function() {
			var interceptor = function(proceed, invocation) {
				assert(invocation.args.length === 1);
			};
			f1 = scarlet.intercept(f1)
				.using(interceptor).resolve();
			f1(111);
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
					self.method = function() {};
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