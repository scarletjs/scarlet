var assert = require("assert");
var enumerable = require("../../../../lib/extensions/enumerable");

module.exports = function (interceptor,instance) {
	describe("when interceptor called on a method with return",function(){
		before(function(){
			interceptor.spy.reset();
			instance.methodWithReturn();
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});

		it("Callback should return intercepted method return",function(){
			assert(interceptor.spy.result === 'any');
		});
	});
};