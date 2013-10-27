var g = require("../../../../include");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

describe("Given /lib/proxies/ProxyInstance", function() {

	var ProxyInfo = require("../../../../lib/proxies/proxy-info");
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

		var proxy = new ProxyInstance(instance, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap();

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			g.assert(proceedWasCalled);
			g.assert(instance.anyProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			instance.anyProperty = "apple";
			var result = instance.anyProperty;
			g.assert(proceedWasCalled);
			g.assert(result == "apple");
		});

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

	});

	describe("When #unwrap()", function() {

		var info = null;
		var instance = new AnyClass();

		var proxy = new ProxyInstance(instance, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap().unwrap();

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			g.assert(!proceedWasCalled);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			var result = instance.anyProperty;
			g.assert(!proceedWasCalled);
		});

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			g.assert(!proceedWasCalled);
		});

	});

});