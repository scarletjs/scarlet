var sinon = require("sinon");

module.exports = function(){

	var interceptorCalledSpy = sinon.spy();
	var postSpy = sinon.spy();
	var interceptor = function callbackInterceptor(proceed){
		interceptorCalledSpy();
		interceptorCalledSpy.result = proceed();
		postSpy();
	};
	interceptor.spy = interceptorCalledSpy;
	interceptor.postSpy = postSpy;
	return interceptor;
};