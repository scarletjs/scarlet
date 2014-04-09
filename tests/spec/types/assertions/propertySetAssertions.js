var assert = require("assert");

module.exports = function (instance) {
	describe("when setting a properties value",function(){
		var originalValue = instance.property;

		before(function(){
			instance.property = "newValue";
		});
		after(function(){
			instance.property = originalValue;
		});
		

		it("Should set property value",function(){
			assert(instance.property == "newValue");
		});
	});
};