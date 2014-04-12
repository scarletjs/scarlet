var assert = require("assert");

module.exports = function (interceptor,method,expectedResult,parameters) {
	describe("when interceptor("+interceptor.name+") called on a method:"+method.name,function(){
		if(!interceptor.spy)
			return;

		before(function(){
			interceptor.spy.reset();
			interceptor.postSpy.reset();
			try{
				method.apply(method,parameters);
			}catch(exception){
				
			}
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});

		it("Should not return back to interceptor after error",function(){
			assert(!interceptor.postSpy.called);
		});
	});
};