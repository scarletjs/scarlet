assert = require("assert");

Enumerable = require("../lib/enumerable");

ObjectLiteral = require("./dummies/object-literal");
NamedFunction = require("./dummies/named-function");
UnnamedFunction = require("./dummies/unnamed-function");
PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are enumerating different object types", function(){

	var methodFound = false;

	beforeEach(function(){
		methodFound = false;
	});	

	describe("When enumerating an object literal", function(){

		var instance = ObjectLiteral;

		it("Then we should find 'method'", function(){

			Enumerable.forEach(instance, function(value, index) {
				methodFound = true;
			});

			assert(methodFound);

		});

	});

	describe("When enumerating a named function", function(){

		var instance = new NamedFunction();

		it("Then we should find 'method'", function(){

			Enumerable.forEach(instance, function(value, index) {
				methodFound = true;
			});

			assert(methodFound);

		});

	});

	describe("When enumerating an un-named function", function(){

		var instance = new UnnamedFunction();

		it("Then we should find 'method'", function(){

			Enumerable.forEach(instance, function(value, index) {
				methodFound = true;
			});

			assert(methodFound);

		});

	});

	describe("When enumerating a prototype function", function(){

		var instance = new UnnamedFunction();

		it("Then we should find 'method'", function(){

			Enumerable.forEach(instance, function(value, index) {
				methodFound = true;
			});

			assert(methodFound);

		});

	});

});