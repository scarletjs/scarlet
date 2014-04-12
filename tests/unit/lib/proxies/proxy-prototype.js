var assert = require("assert");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

AnyClass.prototype.prototypeProperty = "anyPrototypeValue";

AnyClass.prototype.prototypeMethod = function(val) {
	return val;
};

describe("Given /lib/proxies/ProxyPrototype", function() {
	var ProxyPrototype = require("../../../../lib/proxies/proxy-prototype");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {
		var AugmentedClass = null;

		var proxy = new ProxyPrototype(AnyClass);

		proxy.wrap(function(name,proceed, args) {
						proceedThisContext = this;
						proceedWasCalled = true;
						return proceed(args);
					},
					function(newClass){
						AugmentedClass = newClass;
					});

		var instance = new AugmentedClass();

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			assert(proceedWasCalled);
			assert(instance.anyProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'prototypeProperty' set", function() {
			instance.prototypeProperty = 6;
			assert(proceedWasCalled);
			assert(instance.prototypeProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			instance.anyProperty = "apple";
			var result = instance.anyProperty;
			assert(proceedWasCalled);
			assert(result == "apple");
		});

		it("Then should invoke whenCalled delegate for 'prototypeProperty' get", function() {
			instance.prototypeProperty = "apple";
			var result = instance.prototypeProperty;
			assert(proceedWasCalled);
			assert(result == "apple");
		});

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			assert(proceedWasCalled);
			assert(result == 6);
		});

		it("Then should invoke whenCalled delegate for 'prototypeMethod'", function() {
			var result = instance.prototypeMethod(6);
			assert(proceedWasCalled);
			assert(result == 6);
		});

		it("Then should have the correct 'this' context", function(){
			var result = instance.anyMethod(7);
			assert(instance == proceedThisContext);
			assert(result == 7);
		});

	});

	describe("When #unwrap()", function() {

		var proxy = new ProxyPrototype(AnyClass);

		proxy.wrap(function(name, proceed, args) {
					proceedThisContext = this;
					proceedWasCalled = true;
					return proceed(args);
				}).unwrap();

		var instance = new AnyClass();

		it("Then should not invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeProperty' set", function() {
			instance.prototypeProperty = 6;
			assert(!proceedWasCalled);
			assert(instance.prototypeProperty == 6);
		});

		it("Then should not invoke whenCalled delegate for 'property' get", function() {
			var result = instance.anyProperty;
			assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeProperty' get", function() {
			instance.prototypeProperty = "apple";
			var result = instance.prototypeProperty;
			assert(!proceedWasCalled);
			assert(result == "apple");
		});

		it("Then should not invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeMethod'", function() {
			var result = instance.prototypeMethod(6);
			assert(!proceedWasCalled);
			assert(result == 6);
		});
	});

});