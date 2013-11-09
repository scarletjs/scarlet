var g = require("../../../include");
var builders = require("./index");
var Scarlet = require("../../../lib/scarlet");

var scarlet = new Scarlet();

describe("Given we are using builders", function() {

	describe("When calling testing using a builder", function() {

		it("Then it should make assertions fluently", function() {

			builders
				.for(scarlet)
				.withNamedFunction()
				.withObjectLiteral()
				.withUnamedFunction()
				.withPrototypeFunction()
				.withInterceptor()
				.invokeMethod()
				.invokeMethodWithReturn()
				.assert()
					.methodWasCalled()
					.methodWithReturnWasCalled();

		});

	});

});