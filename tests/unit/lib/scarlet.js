var assert = require("assert");

function AnyClass() {
	var self = this;
	self.instanceProperty = "anyValue";
	self.instanceMethod = function(arg1, arg2, arg3) {
		return arg1 + " " + arg2 + " " + arg3;
	};
}

AnyClass.prototype.prototypeProperty = "anyValue";

AnyClass.prototype.prototypeMethod = function(arg1, arg2, arg3) {
	return arg1 + " " + arg2 + " " + arg3;
};

describe("Given /lib/Scarlet", function() {

	var Scarlet = require("../../../lib/scarlet");

	describe("When #intercept/#using(...)", function() {

		var scarlet = new Scarlet();

		var callQueries = [];

		var instanceMethodCalled = false;
		var instancePropertyCalled = false;
		var prototypeMethodCalled = false;
		var prototypePropertyCalled = false;

		var proxyAnyClass =
			scarlet
				.intercept(AnyClass, scarlet.PROTOTYPE)
				.using(function(proceed, invocation) {
					if (invocation.memberName() == "instanceMethod")
						instanceMethodCalled = true;
					if (invocation.memberName() == "instanceProperty")
						instancePropertyCalled = true;
					if (invocation.memberName() == "prototypeMethod")
						prototypeMethodCalled = true;
					if (invocation.memberName() == "prototypeProperty")
						prototypePropertyCalled = true;
					var result = proceed();
					var query = scarlet.interceptQuery(proceed,invocation);
					callQueries.push(query);
					return result;
				})
				.on('error',function(error){
					console.log("ERROR"+error);
				})
				.proxy();

		beforeEach(function() {
			callQueries = [];
			instanceMethodCalled = false;
			instancePropertyCalled = false;
			prototypeMethodCalled = false;
			prototypePropertyCalled = false;
		});

		it("Then it should register a constructor call query", function(){
			var instance = new proxyAnyClass();
			assert(callQueries.length == 1);
			assert(callQueries[0].isConstructor);
		});

		it("Then it should register a property getter call query", function(){
			var instance = new proxyAnyClass();
			var ignoreValue = instance.instanceProperty;
			assert(callQueries.length == 2);
			assert(callQueries[1].isPropertyGetter);
		});

		it("Then it should register a property setter call query", function(){
			var instance = new proxyAnyClass();
			instance.instanceProperty = "anything";
			assert(callQueries.length == 2);
			assert(callQueries[1].isPropertySetter);
		});

		it("Then it should register a method call query", function(){
			var instance = new proxyAnyClass();
			instance.instanceMethod("1", "2", "3");
			assert(callQueries.length == 2);
			assert(callQueries[1].isMethod);
		});

		it("Then should be able to trace call queries", function(){
			var instance = new proxyAnyClass();
			instance.instanceMethod("1", "2", "3");
			assert(callQueries.length == 2);
		});

		it("Then it should call the interceptor for an #instanceMethod()", function() {
			var instance = new proxyAnyClass();
			var result = instance.instanceMethod("apple", "pear", "bananna");
			assert(instanceMethodCalled);

			assert(result == "apple pear bananna");
		});

		it("Then it should call the interceptor for an #instanceProperty()", function() {
			var instance = new proxyAnyClass();
			var result = instance.instanceProperty;
			assert(instancePropertyCalled);
			assert(result == "anyValue");
		});

		it("Then it should call the interceptor for #prototypeMethod()", function() {
			var instance = new proxyAnyClass();
			var result = instance.prototypeMethod("apple", "pear", "bananna");
			assert(prototypeMethodCalled);
			assert(result == "apple pear bananna");
		});

		it("Then it should call the interceptor for #prototypeProperty()", function() {
			var instance = new proxyAnyClass();
			var result = instance.prototypeProperty;
			assert(prototypePropertyCalled);
			assert(result == "anyValue");
		});

		it("Then it should emit a 'before' event", function(done) {
			scarlet.on("before", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor)
					done();
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

		it("Then it should emit a 'after' event", function(done) {
			scarlet.on("after", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor) {
					assert(eventArgs.result == "apple pear bananna");
					done();
				}
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

		it("Then it should emit a 'done' event", function(done) {
			scarlet.on("done", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor) {
					done();
				}
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

	});

});
