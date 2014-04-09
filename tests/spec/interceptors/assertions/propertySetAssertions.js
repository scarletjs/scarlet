var assert = require("assert");

module.exports = function (interceptor,instance,expectedResult,property) {
	describe("when interceptor called on a property set",function(){
		before(function(){
			interceptor.spy.reset();
			instance[property] = "newValue";
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});
	});
};