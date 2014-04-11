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

describe("Given /lib/proxies/ProxyMetadata", function(){

	var proxyMetadata = require("../../../../lib/proxies/proxy-metadata");

	describe("When #ctor()", function(){

		it("Then should not throw if shadow object is null", function(){

			var instance = {};
			var didNotThrowException = true;

			try{
				proxyMetadata(instance, "anyMember");
			} catch(err) {
				didNotThrowException = false;
			}

			assert(didNotThrowException);

		});

	});

	describe("When #isMethod()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for newAnyClass().instanceMethod()", function(){
			var isMethod = proxyMetadata(instance, "instanceMethod").reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'true' for a prototype method", function(){
			var isMethod = proxyMetadata(instance, "prototypeMethod").reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'false' for AnyClass", function(){
			var isMethod = proxyMetadata(AnyClass).reflection.isMethod();
			assert(!isMethod);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeMethod", function(){
			var isMethod = proxyMetadata(AnyClass.prototype, "prototypeMethod").reflection.isMethod();
			assert(isMethod);
		});

		it("Then should be 'false' for a function", function(){
			var isMethod = proxyMetadata(function(){}).reflection.isMethod();
			assert(!isMethod);
		});

	});

	describe("When #isFunction()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for a function(){}", function(){
			var isFunction = proxyMetadata(function(){}).reflection.isFunction();
			assert(isFunction);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var isFunction = proxyMetadata(new AnyClass(), "instanceMethod").reflection.isFunction();
			assert(!isFunction);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var isFunction = proxyMetadata(AnyClass.prototype, "prototypeMethod").reflection.isFunction();
			assert(!isFunction);
		});

		it("Then should be 'false' for an instance", function(){
			var isFunction = proxyMetadata(instance).reflection.isFunction();
			assert(!isFunction);
		});

	});

	describe("When #isProperty()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass().instanceProperty", function(){
			var isProperty = proxyMetadata(instance, "instanceProperty").reflection.isProperty();
			assert(isProperty);
		});

		it("Then should be 'true' for AnyClass.prototype.prototypeProperty", function(){
			var isProperty = proxyMetadata(AnyClass.prototype, "prototypeProperty").reflection.isProperty();
			assert(isProperty);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var isProperty =  proxyMetadata(instance, "instanceMethod").reflection.isProperty();
			assert(!isProperty);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod", function(){
			var isProperty = proxyMetadata(instance, "prototypeMethod").reflection.isProperty();
			assert(!isProperty);
		});

	});

	describe("When #isInstance()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for new AnyClass()", function(){
			var isInstance = proxyMetadata(instance).reflection.isInstance();
			assert(isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var isInstance = proxyMetadata(instance, "instanceMethod").reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for AnyClass.prototype.prototypeMethod()", function(){
			var isInstance = proxyMetadata(AnyClass.prototype, "prototypeMethod").reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var isInstance = proxyMetadata(instance, "instanceProperty").reflection.isInstance();
			assert(!isInstance);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var isInstance = proxyMetadata(instance, "prototypeProperty").reflection.isInstance();
			assert(!isInstance);
		});

	});

	describe("When #isPrototype()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for AnyClass", function(){
			var isPrototype = proxyMetadata(AnyClass).reflection.isPrototype();
			assert(isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceMethod()", function(){
			var isPrototype = proxyMetadata(instance, "instanceMethod").reflection.isPrototype();
			assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().prototypeMethod()", function(){
			var isPrototype = proxyMetadata(instance, "prototypeMethod").reflection.isPrototype();
			assert(!isPrototype);
		});

		it("Then should be 'false' for new AnyClass().instanceProperty", function(){
			var isPrototype = proxyMetadata(instance, "instanceProperty").reflection.isPrototype();
			assert(!isPrototype);
		});

	});

});
