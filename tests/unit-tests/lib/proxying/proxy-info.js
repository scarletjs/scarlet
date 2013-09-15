var g = require("../../../../include");

function AnyClass(){
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function(){
	};
}

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
		instance.__scarlet = {};

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
		instance.__scarlet = {};

		it("Then should be 'true' for a function", function(){
			var info = new ProxyInfo(instance, "anyMethod");
			g.assert(info.isMethod);
		});

		it("Then should be 'false' for a property", function(){
			var info = new ProxyInfo(instance, "anyProperty");
			g.assert(info.isProperty);
		});

	});

});