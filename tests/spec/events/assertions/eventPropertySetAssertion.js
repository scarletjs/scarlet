var assert = require("assert");

module.exports = function (eventSpy,instance,expectedResult,property,eventName) {
	describe("when "+eventName+" event fired on a property set",function(){
		before(function(){
			eventSpy.reset();
			instance[property] = "newValue";
		});

		it("Should call event",function(){
			assert(eventSpy.called)
		});
	});
};