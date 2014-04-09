var assert = require("assert");

module.exports = function (instance,errorEventSpy) {
	describe("when listening for error events on property get",function(){
		var propertyValue;
		
		before(function(){
			errorEventSpy.reset();
			propertyValue = instance.property;
		});

		it("Should not call event",function(){
			assert(!errorEventSpy.called)
		});
	});
};

