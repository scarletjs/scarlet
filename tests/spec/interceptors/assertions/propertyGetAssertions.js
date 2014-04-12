var assert = require("assert");

module.exports = function (interceptor,instance,expectedResult,property) {
	describe("when interceptor("+interceptor.name+") called on a property get",function(){
		if(!interceptor.spy)
			return;
			
		before(function(){
			interceptor.spy.reset();
			var result = instance[property];
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});

		it("Callback should return intercepted method return",function(){
			assert(interceptor.spy.result === expectedResult);
		});
	});
};