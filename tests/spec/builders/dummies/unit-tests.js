var g = require("../../../../include");
var Scarlet = require("../../../../lib/scarlet");

var scarlet = new Scarlet();

describe("NamedFunction", function() {

	var NamedFunction = require("./named-function");;
	var instance = new NamedFunction();

	describe("#method", function() {
		instance.method();
		it("It should be able to track whether the method was called", function() {
			g.assert(instance.methodCalled);
		});

	});

	describe("#methodWithReturn", function(){
		var value = instance.methodWithReturn();
		it("It should be able to track whether the method with return was called", function(){
			g.assert(value == "any");
			g.assert(instance.methodWithReturnCalled);
		});
	});

});

describe("ObjectLiteral", function() {

	var instance = require("./object-literal");

	describe("#method", function() {
		instance.method();
		it("It should be able to track whether the method was called", function() {
			g.assert(instance.methodCalled);
		});

	});

	describe("#methodWithReturn", function(){
		var value = instance.methodWithReturn();
		it("It should be able to track whether the method with return was called", function(){
			g.assert(value == "any");
			g.assert(instance.methodWithReturnCalled);
		});
	});

});

describe("PrototypeFunction", function() {

	var PrototypeFunction = require("./prototype-function");;
	var instance = new PrototypeFunction();

	describe("#method", function() {
		instance.method();
		it("It should be able to track whether the method was called", function() {
			g.assert(instance.methodCalled);
		});

	});

	describe("#methodWithReturn", function(){
		var value = instance.methodWithReturn();
		it("It should be able to track whether the method with return was called", function(){
			g.assert(value == "any");
			g.assert(instance.methodWithReturnCalled);
		});
	});

});

describe("UnnamedFunction", function() {

	var UnnamedFunction = require("./unnamed-function");;
	var instance = new UnnamedFunction();

	describe("#method", function() {
		instance.method();
		it("It should be able to track whether the method was called", function() {
			g.assert(instance.methodCalled);
		});

	});

	describe("#methodWithReturn", function(){
		var value = instance.methodWithReturn();
		it("It should be able to track whether the method with return was called", function(){
			g.assert(value == "any");
			g.assert(instance.methodWithReturnCalled);
		});
	});

});

