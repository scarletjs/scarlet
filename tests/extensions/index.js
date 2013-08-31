require("../../include");

describe("Given we are using extensions", function(){

	describe("When including them from the index file", function(){

		var ext = require("../../lib/extensions");

		it("Then should have an unique identifier instance", function(){
			assert(ext.uuid != null, "Could not find unique identifier instance");
		});

		it("Then should have an extended object instance", function(){
			assert(ext.object != null, "Could not find extended object instance");
		});

		it("Then should have an series instance", function(){
			assert(ext.series != null, "Could not series instance");
		});

		it("Then should have an enumerable instance", function(){
			assert(ext.series != null, "Could not enumerable instance");
		});

	});

});