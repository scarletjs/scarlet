var assert = require("assert");

module.exports = function (interceptor,instance) {
	describe("when interceptor called on a property get",function(){
		var propertyValue;

		before(function(){
			interceptor.spy.reset();
			propertyValue = instance.property;
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});

		it("Callback should return intercepted method return",function(){
			assert(propertyValue);
			assert(interceptor.spy.result === propertyValue);
		});
	});
};