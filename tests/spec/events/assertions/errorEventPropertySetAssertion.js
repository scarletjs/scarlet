var assert = require("assert");

module.exports = function (errorEventSpy,instance,expectedResult,property) {
	describe("when listening for error events on property set",function(){
		var originalValue = instance[property];

		before(function(){
			errorEventSpy.reset();
			instance[property] = "newValue";
		});

		after(function(){
			instance[property] = originalValue;
		});
		it("Should not call event",function(){
			assert(!errorEventSpy.called);
		});
	});
};