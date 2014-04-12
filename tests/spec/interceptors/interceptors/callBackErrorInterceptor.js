var sinon = require("sinon");

module.exports = function(){
	var interceptorCalledSpy = sinon.spy();
	var postSpy = sinon.spy();
	var interceptor = function callbackErrorInterceptor(proceed){
		interceptorCalledSpy();
		interceptorCalledSpy.result = proceed("Any Error");
		postSpy();
	};
	interceptor.spy = interceptorCalledSpy;
	interceptor.postSpy = postSpy;
	return interceptor;
};