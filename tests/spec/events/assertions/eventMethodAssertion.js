var assert = require("assert");

module.exports = function (eventSpy,method,expectedResult,parameters,eventName) {
	describe("when "+eventName+" event fired on a method with return called",function(){
		before(function(){
			eventSpy.reset();
			try{
				method.apply(method,parameters);
			}catch(exception){}
		});

		it("Should call event",function(){
			assert(eventSpy.called);
		});
	});
};