var assert = require("assert");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

describe("Given /lib/proxies/ProxyInstance", function() {
	var ProxyInstance = require("../../../../lib/proxies/proxy-instance");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var info = null;
		var instance = new AnyClass();

		var proxy = new ProxyInstance(instance);

		proxy.wrap(function(name, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			assert(proceedWasCalled);
			assert(instance.anyProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			instance.anyProperty = "apple";
			var result = instance.anyProperty;
			assert(proceedWasCalled);
			assert(result == "apple");
		});

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
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

		var info = null;
		var instance = new AnyClass();

		var proxy = new ProxyInstance(instance);

		proxy.wrap(function(name, proceed, args) {
						proceedThisContext = this;
						proceedWasCalled = true;
						console.log("here");
						return proceed(args);
					}).unwrap();

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			assert(!proceedWasCalled);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			var result = instance.anyProperty;
			assert(!proceedWasCalled);
		});

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			assert(!proceedWasCalled);
		});
		
	});

});