var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");

describe("When using a callback interceptor",function(){
	describe("When intercepting instance", function() {
		var scarlet = new Scarlet();
		builder.for(scarlet)
			.withAllInstanceTypes()
			.withCallbackInterceptor()
			.withAllEventListeners()
			.forInstance()
			.assert();
	});

	// describe("When intercepting method with a return", function() {
	// 	var scarlet = new Scarlet();
	// 	builder.for(scarlet)
	// 		.withAllInstanceTypes()
	// 		.withCallbackInterceptor()
	// 		.withAllEventListeners()
	// 		.forMethodWithReturn()
	// 		.assert();
	// });

	// describe("When intercepting method with a return by name", function() {
	// 	var scarlet = new Scarlet();
	// 	builder.for(scarlet)
	// 			.withAllInstanceTypes()
	// 			.withCallbackInterceptor()
	// 			.withAllEventListeners()
	// 			.forMethodWithReturnByName()
	// 			.assert();
	// });

	// describe("Given we are intercepting a property", function() {
	// 	var scarlet = new Scarlet();

	// 	builder.for(scarlet)
	// 			.withAllInstanceTypes()
	// 			.withCallbackInterceptor()
	// 			.withAllEventListeners()
	// 			.forProperty()
	// 			.assert();
	// });
});