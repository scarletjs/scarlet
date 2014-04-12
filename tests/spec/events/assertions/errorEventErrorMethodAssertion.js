var assert = require("assert");

module.exports = function (errorEventSpy,method,expectedResult,parameters,eventName) {
	describe("when listening for error events on a method with an error",function(){
		before(function(){
			errorEventSpy.reset();
			try{
				method.apply(method,parameters);
			}catch(exception){}
		});

		it("Should call error event",function(){
			assert(errorEventSpy.called);
		});
	});
};