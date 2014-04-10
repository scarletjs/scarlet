var assert = require("assert");

module.exports = function (instance,expectedResult,property) {
	describe("when getting a properties value",function(){
		it("Should get property value",function(){
			assert(instance[property] == expectedResult);
		});
	});
};