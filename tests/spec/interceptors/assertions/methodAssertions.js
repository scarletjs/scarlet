var assert = require("assert");

module.exports = function (interceptor,method,expectedResult,parameters) {
	describe("when interceptor("+interceptor.name+") called on a method:"+method.name,function(){
		if(!interceptor.spy)
			return;
			
		before(function(){
			interceptor.spy.reset();
			method.apply(method,parameters);
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});

		if(expectedResult){
			it("Callback should return intercepted method return",function(){
				assert(interceptor.spy.result === expectedResult);
			});
		}
	});
};