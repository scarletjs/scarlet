var assert = require("assert");

module.exports = function (instance,errorEventSpy) {
	describe("when listening for error events on a method with return called",function(){
		var result;
		before(function(){
			errorEventSpy.reset();
			result = instance.methodWithReturn();
		});

		it("Should not call errpr event",function(){
			assert(!errorEventSpy.called)
		});
	});
};