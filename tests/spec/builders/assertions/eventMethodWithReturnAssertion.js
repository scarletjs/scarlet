var assert = require("assert");

module.exports = function (instance,eventSpy,eventName) {
	describe("when "+eventName+" event fired on a method with return called",function(){
		var result;
		before(function(){
			eventSpy.reset();
			result = instance.methodWithReturn();
		});

		it("Should call event",function(){
			assert(eventSpy.called)
		});
	});
};