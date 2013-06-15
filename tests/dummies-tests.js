assert = require("assert");

ObjectLiteral = require("./dummies/object-literal");
NamedFunction = require("./dummies/named-function");
UnnamedFunction = require("./dummies/unnamed-function");
PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are working with dummies", function() {

	describe("When constructing an object literal", function() {

		var instance = ObjectLiteral;

		it("Then it should not be null", function(){

			assert(instance);

		});

	});

	describe("When constructing a named function", function() {

		var instance = new NamedFunction();

		it("Then it should not be null", function(){

			assert(instance);

		});

	});

	describe("When constructing an unnamed function", function() {

		var instance = new UnnamedFunction();

		it("Then it should not be null", function(){

			assert(instance);

		});

	});

	describe("When constructing a prototype function", function() {

		var instance = new PrototypeFunction();

		it("Then it should not be null", function(){

			assert(instance);

		});

	});

});