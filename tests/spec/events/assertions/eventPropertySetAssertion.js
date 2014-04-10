var assert = require("assert");

module.exports = function (eventSpy,instance,expectedResult,property,eventName) {
	describe("when "+eventName+" event fired on a property set",function(){
		var originalValue = instance[property];

		before(function(){
			eventSpy.reset();
			instance[property] = "newValue";
		});

		after(function(){
			instance[property] = originalValue;
		});

		it("Should call event",function(){
			assert(eventSpy.called);
		});
	});
};