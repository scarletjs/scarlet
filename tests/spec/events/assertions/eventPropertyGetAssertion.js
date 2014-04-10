var assert = require("assert");

module.exports = function (eventSpy,instance,expectedResult,property,eventName) {
	describe("when "+eventName+" event fired on a property get",function(){
		before(function(){
			eventSpy.reset();
			var result = instance[property];
		});

		it("Should call event",function(){
			assert(eventSpy.called);
		});
	});
};

