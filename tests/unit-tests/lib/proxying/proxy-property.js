var g = require("../../../../include");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function() {};
}

describe("Given /lib/proxying/ProxyProperty", function() {

	var ProxyInfo = require("../../../../lib/proxying/proxy-info");
	var ProxyProperty = require("../../../../lib/proxying/proxy-property");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyProperty");

		var proxy = new ProxyProperty(info, function(proxyInfo, proceed) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed();
		});

		proxy.wrap();

		it("Then should invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			g.assert(proceedWasCalled);
			g.assert(result == "anyValue");
		});

		it("Then should invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			g.assert(proceedWasCalled);
		});

		it("Then should have the correct 'this' context", function(){
			instance.anyProperty = "anyValue";
			g.assert(instance == proceedThisContext);
		});

		it("Then should have a '__scarlet' shadow object", function(){
			g.assert(instance.__scarlet__);
		});

	});

	describe("When #unwrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyProperty");

		var proxy = new ProxyProperty(info, function(proxyInfo, proceed) {
			proceedWasCalled = true;
			return proceed();
		});

		proxy.wrap().unwrap();

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			g.assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			g.assert(!proceedWasCalled);
		});

	});

});