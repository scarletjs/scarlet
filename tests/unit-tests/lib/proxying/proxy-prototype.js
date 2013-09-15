var g = require("../../../../include");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(val) { return val; };
}

AnyClass.prototype.prototypeProperty = "anyPrototypeValue";

AnyClass.prototype.prototypeMethod = function(val) {
	return val;
}

describe("Given /lib/proxying/ProxyPrototype", function() {

	var ProxyInfo = require("../../../../lib/proxying/proxy-info");
	var ProxyPrototype = require("../../../../lib/proxying/proxy-prototype");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var info = null;
		var AugmentedClass = null;

		var proxy = new ProxyPrototype(AnyClass, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap(function(newClass){
			AugmentedClass = newClass;
		});

		var instance = new AugmentedClass();

		it("Then should invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			g.assert(proceedWasCalled);
			g.assert(instance.anyProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'prototypeProperty' set", function() {
			instance.prototypeProperty = 6;
			g.assert(proceedWasCalled);
			g.assert(instance.prototypeProperty == 6);
		});

		it("Then should invoke whenCalled delegate for 'property' get", function() {
			instance.anyProperty = "apple";
			var result = instance.anyProperty;
			g.assert(proceedWasCalled);
			g.assert(result == "apple");
		});

		it("Then should invoke whenCalled delegate for 'prototypeProperty' get", function() {
			instance.prototypeProperty = "apple";
			var result = instance.prototypeProperty;
			g.assert(proceedWasCalled);
			g.assert(result == "apple");
		});

		it("Then should invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			g.assert(proceedWasCalled);
			g.assert(result == 6);
		});

		it("Then should invoke whenCalled delegate for 'prototypeMethod'", function() {
			var result = instance.prototypeMethod(6);
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

		var proxy = new ProxyPrototype(AnyClass, function(proxyInfo, proceed, args) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed(args);
		});

		proxy.wrap().unwrap();

		var instance = new AnyClass();

		it("Then should not invoke whenCalled delegate for 'property' set", function() {
			instance.anyProperty = 6;
			g.assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeProperty' set", function() {
			instance.prototypeProperty = 6;
			g.assert(!proceedWasCalled);
			g.assert(instance.prototypeProperty == 6);
		});

		it("Then should not invoke whenCalled delegate for 'property' get", function() {
			var result = instance.anyProperty;
			g.assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeProperty' get", function() {
			instance.prototypeProperty = "apple";
			var result = instance.prototypeProperty;
			g.assert(!proceedWasCalled);
			g.assert(result == "apple");
		});

		it("Then should not invoke whenCalled delegate for 'method'", function() {
			var result = instance.anyMethod(6);
			g.assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'prototypeMethod'", function() {
			var result = instance.prototypeMethod(6);
			g.assert(!proceedWasCalled);
			g.assert(result == 6);
		});

	});

});