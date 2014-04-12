var assert = require("assert");

module.exports = function (errorEventSpy,instance,expectedResult,property) {
	describe("when listening for error events on property get",function(){
		before(function(){
			errorEventSpy.reset();
			var propertyValue = instance[property];
		});

		it("Should not call event",function(){
			assert(!errorEventSpy.called);
		});
	});
};

