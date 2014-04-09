var assert = require("assert");
var enumerable = require("../../../../lib/extensions/enumerable");

module.exports = function (instance) {
	describe("When method with return called",function(){
		var result;
		
		before(function(){
			instance.methodWithReturn.spy.reset();
			result = instance.methodWithReturn();
		});

		it("Should call method with return",function(){
			assert(instance.methodWithReturn.spy.called);
		});
	});
};