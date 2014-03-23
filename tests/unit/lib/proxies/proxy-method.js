var assert = require("assert");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

describe("Given /lib/proxies/ProxyMethod", function() {

	var ProxyInfo = require("../../../../lib/proxies/proxy-info");
	var ProxyMethod = require("../../../../lib/proxies/proxy-method");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyMethod");

		var proxy = new ProxyMethod(info, function(proceed, args, proxyInfo) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap();

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

		it("Then should have a '__scarlet' shadow object", function(){
			assert(instance.__scarlet__);
		});

	});

	describe("When #unwrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyMethod");

		var proxy = new ProxyMethod(info, function(proceed, args, proxyInfo) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed.call(proxyInfo.instance, args);
		});

		proxy.wrap().unwrap();

		it("Then should not invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			assert(!proceedWasCalled);
			assert(result == 6);
		});

	});

});