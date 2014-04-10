var assert = require("assert");

module.exports = function (errorMethod, expectedResult, parameters) {
	describe("When calling method that throws an error:"+errorMethod.name,function(){
		var result;
		var didThrowError = false;

		before(function(){

			if(errorMethod.spy)
				errorMethod.spy.reset();

			try{
				result = errorMethod.apply(errorMethod,parameters);
			}catch(exception){
				didThrowError = true;
			}
		});

		if(errorMethod.spy){
			it("Should call method",function(){
				assert(errorMethod.spy.called);
			});
		}

		it("Should throw error",function(){
			assert(didThrowError);
		});
	});
};