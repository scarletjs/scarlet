var g = require("../../../../include");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

describe("Given /lib/proxying/ProxyMethod", function() {

	var ProxyInfo = require("../../../../lib/proxying/proxy-info");
	var ProxyMethod = require("../../../../lib/proxying/proxy-method");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyMethod");

		var proxy = new ProxyMethod(info, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap();

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			g.assert(proceedWasCalled);
			g.assert(result == 6);
		});

		it("Then should have the correct 'this' context", function(){
			var result = instance.anyMethod(7);
			g.assert(instance == proceedThisContext);
			g.assert(result == 7);
		});

		it("Then should have a '__scarlet' shadow object", function(){
			g.assert(instance.__scarlet);
		});

	});

	describe("When #unwrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyMethod");

		var proxy = new ProxyMethod(info, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed.call(proxyInfo.instance, args);
		});

		proxy.wrap().unwrap();

		it("Then should not invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			g.assert(!proceedWasCalled);
			g.assert(result == 6);
		});

	});

});