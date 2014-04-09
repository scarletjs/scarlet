var callbackInterceptor = require('./interceptors/callbackInterceptor');
var InterceptorAssertionBuilder = require("./interceptor-assertion-builder");

module.exports = function InterceptorBuilder(scarlet){
	var self = this;

	self.interceptors = [];
	this.interceptorAssertionBuilder = new InterceptorAssertionBuilder();
	self.callbackInterceptor = callbackInterceptor();

	self.withCallbackInterceptor = function(){
		var interceptor = self.callbackInterceptor
		this.interceptorAssertionBuilder.withInterceptor(interceptor);
		self.interceptors.push(interceptor);
		return self;
	};

};