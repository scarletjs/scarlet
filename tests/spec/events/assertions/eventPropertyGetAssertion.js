var assert = require("assert");

module.exports = function (instance,eventSpy,eventName) {
	describe("when "+eventName+" event fired on a property get",function(){
		var propertyValue;
		
		before(function(){
			eventSpy.reset();
			propertyValue = instance.property;
		});

		it("Should call event",function(){
			assert(eventSpy.called)
		});
	});
};

