var assert = require("assert");

module.exports = function (errorEventSpy,method,expectedResult,parameters,eventName) {
	describe("when listening for error events on a method with return called",function(){
		before(function(){
			errorEventSpy.reset();
			method.apply(method,parameters);
		});

		it("Should not call error event",function(){
			assert(!errorEventSpy.called);
		});
	});
};