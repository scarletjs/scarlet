var g = require("../../../../include");

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

describe("Given /lib/proxying/ProxyInfo", function(){

	var ProxyInfo = require("../../../../lib/proxying/proxy-info");

	describe("When #ctor()", function(){

		it("Then should not throw if shadow object is null", function(){

			var instance = {};
			var didNotThrowException = true;

			try{	
				new ProxyInfo(instance, "anyMember");
			} catch(err) {
				didNotThrowException = false;
			}

			g.assert(didNotThrowException);

		});

	});

	describe("When #isMethod()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for newAnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isMethod = info.isMethod();
			g.assert(isMethod);
		});

		it("Then should be 'true' for a prototype method", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isMethod = info.isMethod();
			g.assert(isMethod);
		});

		it("Then should be 'false' for AnyClass", function(){
			var info = new ProxyInfo(AnyClass);
			var isMethod = info.isMethod();
			g.assert(!isMethod);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeMethod", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isMethod = info.isMethod();
			g.assert(isMethod);
		});

		it("Then should be 'false' for a function", function(){
			var info = new ProxyInfo(function(){});
			var isMethod = info.isMethod();
			g.assert(!isMethod);
		});

	});

	describe("When #isFunction()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for a function(){}", function(){
			var info = new ProxyInfo(function(){});
			var isFunction = info.isFunction();
			g.assert(isFunction);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(new AnyClass(), "instanceMethod");
			var isFunction = info.isFunction();
			g.assert(!isFunction);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isFunction = info.isFunction();
			g.assert(!isFunction);
		});

		it("Then should be 'false' for an instance", function(){
			var info = new ProxyInfo(instance);
			var isFunction = info.isFunction();
			g.assert(!isFunction);
		});

	});

	describe("When #isProperty()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isProperty = info.isProperty();
			g.assert(isProperty);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeProperty", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeProperty");
			var isProperty = info.isProperty();
			g.assert(isProperty);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isProperty = info.isProperty();
			g.assert(!isProperty);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isProperty = info.isProperty();
			g.assert(!isProperty);
		});

	});

	describe("When #isInstance()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass()", function(){
			var info = new ProxyInfo(instance);
			var isInstance = info.isInstance();
			g.assert(isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isInstance = info.isInstance();
			g.assert(!isInstance);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var info = new ProxyInfo(AnyClass.prototype, "prototypeMethod");
			var isInstance = info.isInstance();
			g.assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isInstance = info.isInstance();
			g.assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var info = new ProxyInfo(instance, "prototypeProperty");
			var isInstance = info.isInstance();
			g.assert(!isInstance);
		});

	});

	describe("When #isPrototype()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for AnyClass", function(){
			var info = new ProxyInfo(AnyClass);
			var isPrototype = info.isPrototype();
			g.assert(isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var info = new ProxyInfo(instance, "instanceMethod");
			var isPrototype = info.isPrototype();
			g.assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var info = new ProxyInfo(instance, "prototypeMethod");
			var isPrototype = info.isPrototype();
			g.assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var info = new ProxyInfo(instance, "instanceProperty");
			var isPrototype = info.isPrototype();
			g.assert(!isPrototype);
		});

	});

});