var assert = require("assert");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function() {};
}

describe("Given /lib/proxies/ProxyProperty", function() {
	var ProxyProperty = require("../../../../lib/proxies/proxy-property");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();

		var proxy = new ProxyProperty(instance, "anyProperty");

		proxy.wrap(function(name,proceed,args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed();
		});

		it("Then should invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			assert(proceedWasCalled);
			assert(result == "anyValue");
		});

		it("Then should invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			assert(proceedWasCalled);
		});

		it("Then should have the correct 'this' context", function(){
			instance.anyProperty = "anyValue";
			assert(instance == proceedThisContext);
		});
	});

	describe("When #unwrap()", function() {

		var instance = new AnyClass();

		var proxy = new ProxyProperty(instance, "anyProperty");

		proxy.wrap(function(name,proceed,args) {
					proceedWasCalled = true;
					return proceed();
				}).unwrap();

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			assert(!proceedWasCalled);
		});
	});

});