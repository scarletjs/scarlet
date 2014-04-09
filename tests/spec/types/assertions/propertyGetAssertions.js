var assert = require("assert");

module.exports = function (instance) {
	describe("when getting a properties value",function(){
		var propertyValue = instance.property;

		it("Should get property value",function(){
			assert(propertyValue == "any");
		});
	});
};