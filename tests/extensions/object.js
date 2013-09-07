require("../../include");

describe("Given we are using an object", function(){

	var ext = require("../../lib/extensions");

	describe("When discovering function parameters", function(){

		it("Then it should be able to discover the paramters", function(){
			var interceptor = function(proceed, invocation, done) {};
			var results = ext.object.getParameterNames(interceptor);
			assert(results[0] == "proceed");
			assert(results[1] == "invocation");
			assert(results[2] == "done");
		});

	});

});