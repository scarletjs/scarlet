var g = require("../../../include");

function AnyClass(){
	var self = this;
	self.instanceProperty = "anyValue";
	self.instanceMethod = function(arg1, arg2, arg3){
		return arg1 + " " + arg2 + " " + arg3;
	};
}

AnyClass.prototype.prototypeProperty = "anyValue";

AnyClass.prototype.prototypeMethod = function(val) {
	return val;
};

describe("Given /lib/Scarlet", function(){

	var Scarlet = require("../../../lib/scarlet");

	describe("When #intercept/#using(...)", function(){

		var scarlet = new Scarlet();
		var interceptorCalled = false;

		var proxyAnyClass = 
			scarlet
				.intercept(AnyClass)
				.using(function(info, method, args){
					interceptorCalled = true;
					return method.call(this, info, method, args);
				}).asProxy();

		beforeEach(function(){
			interceptorCalled = false;
		});

		it("Then it should call the interceptor", function(){
			var instance = new proxyAnyClass();
			var result = instance.instanceMethod("apple", "pear", "bananna");
			g.assert(interceptorCalled);
			g.assert(result == "apple pear bananna");
		})

	});

});

