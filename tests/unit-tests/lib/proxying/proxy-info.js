var g = require("../../../../include");

function AnyClass(){
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(){
	};
}

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

	describe("When get isProperty: function()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for a property", function(){
			var info = new ProxyInfo(instance, "anyProperty");
			g.assert(info.isProperty);
		});

		it("Then should be 'false' for a method", function(){
			var info = new ProxyInfo(instance, "anyMethod");
			g.assert(!info.isProperty);
		});

	});

	describe("When get isMethod: function()", function(){

		var instance = new AnyClass();

		it("Then should be 'true' for a function", function(){
			var info = new ProxyInfo(instance, "anyMethod");
			g.assert(info.isMethod);
		});

		it("Then should be 'false' for a property", function(){
			var info = new ProxyInfo(instance, "anyProperty");
			g.assert(info.isProperty);
		});

	});

	/* TODO: Need facility for checking whether the function has a prototype */
	/*describe("When get isPrototype: function()", function(){

		it("Then should be 'true' for a prototype class", function(){
			var info = new ProxyInfo(AnyClass, "prototypeMethod");
			g.assert(info.isPrototype);
		});

	});*/

});