var g = require("../../../include");

function AnyClass() {
	var self = this;
	self.instanceProperty = "anyValue";
	self.instanceMethod = function(arg1, arg2, arg3) {
		return arg1 + " " + arg2 + " " + arg3;
	};
}

AnyClass.prototype.prototypeProperty = "anyValue";

AnyClass.prototype.prototypeMethod = function(arg1, arg2, arg3) {
	return arg1 + " " + arg2 + " " + arg3;
};

describe("Given /lib/Scarlet", function() {

	var Scarlet = require("../../../lib/scarlet");

	describe("When #intercept/#using(...)", function() {

		var scarlet = new Scarlet();

		var instanceMethodCalled = false;
		var instancePropertyCalled = false;
		var prototypeMethodCalled = false;
		var prototypePropertyCalled = false;

		var proxyAnyClass =
			scarlet
				.intercept(AnyClass, scarlet.PROTOTYPE)
				.using(function(info, method, args) {
					if (info.memberName == "instanceMethod")
						instanceMethodCalled = true;
					if (info.memberName == "instanceProperty")
						instancePropertyCalled = true;
					if (info.memberName == "prototypeMethod")
						prototypeMethodCalled = true;
					if (info.memberName == "prototypeProperty")
						prototypePropertyCalled = true;
					return method.call(this, info, method, args);
				})
				.proxy();

		beforeEach(function() {
			instanceMethodCalled = false;
			instancePropertyCalled = false;
			prototypeMethodCalled = false;
			prototypePropertyCalled = false;
		});

		it("Then it should call the interceptor for an #instanceMethod()", function() {
			var instance = new proxyAnyClass();
			var result = instance.instanceMethod("apple", "pear", "bananna");
			g.assert(instanceMethodCalled);
			g.assert(result == "apple pear bananna");
		});

		it("Then it should call the interceptor for an #instanceProperty()", function() {
			var instance = new proxyAnyClass();
			var result = instance.instanceProperty;
			g.assert(instancePropertyCalled);
			g.assert(result == "anyValue");
		});

		it("Then it should call the interceptor for #prototypeMethod()", function() {
			var instance = new proxyAnyClass();
			var result = instance.prototypeMethod("apple", "pear", "bananna");
			g.assert(prototypeMethodCalled);
			g.assert(result == "apple pear bananna");
		});

		it("Then it should call the interceptor for #prototypeProperty()", function() {
			var instance = new proxyAnyClass();
			var result = instance.prototypeProperty;
			g.assert(prototypePropertyCalled);
			g.assert(result == "anyValue");
		});

		it("Then it should emit a 'before' event", function(done) {
			scarlet.on("before", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor)
					done();
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

		it("Then it should emit a 'after' event", function(done) {
			scarlet.on("after", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor) {
					g.assert(eventArgs.result == "apple pear bananna");
					done();
				}
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

		it("Then it should emit a 'done' event", function(done) {
			scarlet.on("done", function(eventArgs) {
				if (!eventArgs.info.type.isConstructor) {
					done();
				}
			});
			var instance = new proxyAnyClass();
			instance.instanceMethod("apple", "pear", "bananna");
			scarlet.removeAllListeners();
		});

	});

});
