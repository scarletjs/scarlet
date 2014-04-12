var callbackInterceptor = require("./interceptors/callbackInterceptor");
var callbackErrorInterceptor = require("./interceptors/callBackErrorInterceptor");

module.exports = function InterceptorBuilder(scarlet){
	var self = this;

	self.interceptors = [];

	self.withCallbackInterceptor = function(){
		var interceptor = callbackInterceptor();
		self.interceptors.push(interceptor);
		return self;
	};
	self.withCallbackErrorInterceptor = function(){
		var interceptor = callbackErrorInterceptor();
		self.interceptors.push(interceptor);
		return self;
	};
	self.withInterceptor = function(interceptor){
		self.interceptors.push(interceptor);
		return self;
	};
};