var assert = require("assert");

module.exports = function (anyMethod, expectedResult, parameters) {
	describe("When calling method:"+anyMethod.name,function(){
		var result;
		
		before(function(){
			if(anyMethod.spy)
				anyMethod.spy.reset();

			result = anyMethod.apply(anyMethod,parameters);
		});

		if(anyMethod.spy){
			it("Should call method",function(){
				assert(anyMethod.spy.called);
			});
		}

		if(expectedResult){
			it("Should return expected result",function(){
				assert(result === expectedResult);
			});
		}
	});
};