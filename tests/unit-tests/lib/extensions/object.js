require("../../../../include");

describe("Given lib/extensions/Object", function(){

	var ext = require("../../../../lib/extensions");

	describe("When #getParameterNames()", function(){

		it("Then it should be able to discover the paramters", function(){
			var interceptor = function(proceed, invocation, done) {};
			var results = ext.object.getParameterNames(interceptor);
			assert(results[0] == "proceed");
			assert(results[1] == "invocation");
			assert(results[2] == "done");
		});

	});

	describe("When #isNull()", function(){

		var nullObj = null;

		it("Then should return true for null reference", function(){
			assert(ext.object.isNull(nullObj));
		});

		it("Then should return false for non null reference", function(){
			assert(!ext.object.isNull(new function(){}));
		});

	});

});