var assert = require("assert");
//var proxyMetadata = require('../../../../lib/proxies/proxy-metadata');

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

describe("Given /lib/proxies/ProxyMethod", function() {
	var ProxyMethod = require("../../../../lib/proxies/proxy-method");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();

		var proxy = new ProxyMethod(instance, "anyMethod");

		proxy.wrap(function(name, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
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

		var instance = new AnyClass();

		var proxy = new ProxyMethod(instance, "anyMethod");

		proxy.wrap(function(name, proceed, args) {
					proceedThisContext = this;
					proceedWasCalled = true;
					return proceed.call(this, args);
				}).unwrap();

		it("Then should not invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			assert(!proceedWasCalled);
			assert(result == 6);
		});

	});

});