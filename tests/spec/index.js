var g = require("../../include");
var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");

describe("Given we are using scarlet", function() {

	var scarlet = new Scarlet();

	describe("When invoking the named function with an interceptor", function() {

		var assertThat = 
		
		builder
			.for (scarlet)
			.withNamedFunction()
			.withObjectLiteral()
			.withPrototypeFunction()
			.withUnamedFunction()
			.withInterceptor()
			.invokeMethod()
			.invokeMethodWithReturn()
			.assert();

		it("Then we should be able to verify the interceptor was called", function() {
			assertThat.methodWasCalled();
			assertThat.methodWithReturnWasCalled();
		});

	});

});