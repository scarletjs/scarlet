var g = require("../../include");
var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");

describe("Given we are using scarlet", function() {

	var scarlet = new Scarlet();

	describe("When invoking all kinds of instances", function() {

		var assertThat = 
			builder
				.for(scarlet)
				.withInstances()
				.withInterceptor()
				.invokeAll()
				.assert();

		it("Then we should be able to verify all methods were invoked", function() {
			assertThat.allInvoked();
		});

	});

});