var sinon = require('sinon');

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
}

var CallbackWithErrorInterceptor = function(onBeforeCall,onAfterCalled){
	return function(proceed){
		onBeforeCall();
		var result = proceed("Any Error");
		onAfterCalled(result);
	};
};

var CallbackWithReturnInterceptor = function(onBeforeCall,onAfterCalled){
	return function(proceed){
		onBeforeCall();
		var result = proceed(null,"Any Return");
		onAfterCalled(result);
	};
};

var InfoInterceptor = function(onBeforeCall,onAfterCalled){
	return function(info, proceed) {
		onBeforeCall(info);
		var result = proceed();
		onAfterCalled(result,info);
	};
};

var ErrorInterceptor = function(onBeforeCall,onAfterCalled){
	return function(error, info, proceed) {
		onBeforeCall(info,error);
		var result = proceed();
		onAfterCalled(result,info);
	};
};
