var assert = require("assert");

module.exports = function (interceptor,instance,expectedResult,property) {
	describe("when interceptor("+interceptor.name+") called on a property set",function(){
		if(!interceptor.spy)
			return;
			
		var originalValue = instance[property];

		before(function(){
			interceptor.spy.reset();
			instance[property] = "newValue";
		});

		after(function(){
			instance[property] = originalValue;
		});

		it("Should call interceptor",function(){
			assert(interceptor.spy.called);
		});

		it("Should call interceptor once for each intercepted member",function(){
			assert(interceptor.spy.callCount === 1);
		});
	});
};