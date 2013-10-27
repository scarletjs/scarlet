var g = require("../../../../include");

describe("Given lib/extensions/", function(){

	describe("When #require()", function(){

		var ext = require("../../../../lib/extensions");

		it("Then should have an extended object instance", function(){
			g.assert(ext.object != null, "Could not find extended object instance");
		});

		it("Then should have an enumerable instance", function(){
			g.assert(ext.enumerable != null, "Could not find enumerable instance");
		});

	});

});