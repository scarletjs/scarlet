var assert = require("assert");

function AnyClass(){
	var self = this;
	self.instanceProperty = "anyValue";
	self.instanceMethod = function(){
	};
}

AnyClass.prototype.prototypeProperty = "anyValue";

AnyClass.prototype.prototypeMethod = function(val) {
	return val;
};

describe("Given /lib/proxies/ProxyInfo", function(){

	var ProxyInfo = require("../../../../lib/proxies/proxy-info");

	describe("When #ctor()", function(){

		it("Then should not throw if shadow object is null", function(){

			var instance = {};
			var didNotThrowException = true;

			try{
				new ProxyInfo(instance, "anyMember");
			} catch(err) {
				didNotThrowException = false;
			}

			assert(didNotThrowException);

		});

	});

	describe("When #isMethod()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for newAnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isMethod = info.reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'true' for a prototype method", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isMethod = info.reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'false' for AnyClass", function(){
			var info = new ProxyInfo(AnyClass);
			var isMethod = info.reflection.isMethod();
			assert(!isMethod);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeMethod", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isMethod = info.reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'false' for a function", function(){
			var info = new ProxyInfo(function(){});
			var isMethod = info.reflection.isMethod();
			assert(!isMethod);
		});

	});

	describe("When #isFunction()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for a function(){}", function(){
			var info = new ProxyInfo(function(){});
			var isFunction = info.reflection.isFunction();
			assert(isFunction);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(new AnyClass(), "instanceMethod");
			var isFunction = info.reflection.isFunction();
			assert(!isFunction);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isFunction = info.reflection.isFunction();
			assert(!isFunction);
		});

		it("Then should be 'false' for an instance", function(){
			var info = new ProxyInfo(instance);
			var isFunction = info.reflection.isFunction();
			assert(!isFunction);
		});

	});

	describe("When #isProperty()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isProperty = info.reflection.isProperty();
			assert(isProperty);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeProperty", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeProperty");
			var isProperty = info.reflection.isProperty();
			assert(isProperty);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isProperty = info.reflection.isProperty();
			assert(!isProperty);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isProperty = info.reflection.isProperty();
			assert(!isProperty);
		});

	});

	describe("When #isInstance()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass()", function(){
			var info = new ProxyInfo(instance);
			var isInstance = info.reflection.isInstance();
			assert(isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isInstance = info.reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isInstance = info.reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isInstance = info.reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var info = new ProxyInfo(instance, "prototypeProperty");
			var isInstance = info.reflection.isInstance();
			assert(!isInstance);
		});

	});

	describe("When #isPrototype()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for AnyClass", function(){
			var info = new ProxyInfo(AnyClass);
			var isPrototype = info.reflection.isPrototype();
			assert(isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isPrototype = info.reflection.isPrototype();
			assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isPrototype = info.reflection.isPrototype();
			assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isPrototype = info.reflection.isPrototype();
			assert(!isPrototype);
		});

	});

});
