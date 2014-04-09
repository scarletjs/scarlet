var assert = require("assert");

module.exports = function (instance,errorEventSpy,eventName) {
	describe("when no error",function(){
		// before(function(){
		// 	errorEventSpy.reset();
		// });
		after(function(){
			errorEventSpy.reset();
		});
		describe("when using error events",function(){
			it("Should not call error event",function(){
				assert(!errorEventSpy.called)
			});
		});
	});
};