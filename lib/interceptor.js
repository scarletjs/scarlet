var Interceptor = module.exports = exports = function(){
	var self = this;

	self.interceptors = [];
	self.result = undefined;
	self.nextInterceptorCallId = 0;

	return self;
};

Interceptor.prototype.intercept = function(targetMethod){
	this.targetMethod = targetMethod;
	return this;
};

Interceptor.prototype.by = function(nextInterceptor){
	var self = this;
	if(!(nextInterceptor instanceof InterceptorContext))
		nextInterceptor = new InterceptorContext(nextInterceptor);

	self.interceptors.unshift(nextInterceptor);
	return self;
};

Interceptor.prototype.getInvocation = function(paramaters){
	var self = this;
	self.nextInterceptorCallId++;
	
	var invocation = {
		proceed : function(){ 
			if(!paramaters)
				paramaters = [];

			paramaters.unshift(self);
			return self.proceed.apply(self,paramaters); 
		},
		method : self.targetMethod,
		paramaters : paramaters,
		target : self.target
	};

	return invocation;
};

Interceptor.prototype.proceed = function(){
	var self = this;

	if(!paramaters)
		paramaters = [];

	var lastArg = paramaters[paramaters.length-1];
	var paramaters = Array.prototype.slice.call(arguments);

	if(self.interceptors.length > self.nextInterceptorCallId)
		return self.executeNextInterceptor(paramaters);

	self.nextInterceptorCallId = 0;
	return self.execute(paramaters,self.target,self.targetMethod);
};

Interceptor.prototype.executeNextInterceptor = function(paramaters){
	var self = this;

	var interceptor = self.interceptors[self.nextInterceptorCallId];
	var invocation = self.getInvocation(paramaters);
	paramaters = [invocation];

	return self.execute(paramaters,interceptor.target,interceptor.method);
};

Interceptor.prototype.execute = function(paramaters,thisContext,method){
	var self = this;

	if(!method)
		return self.result;

	if(!(method instanceof Function))
		return method;

	self.result = method.apply(thisContext,paramaters);

	return self.result;
};

var InterceptorContext = exports.InterceptorContext = function(interceptor,interceptorMethodToCall){
	var self = this;
	if(!interceptorMethodToCall)
		interceptorMethodToCall = interceptor;

	var name = interceptor.name;
	if(!name)
		name = interceptor.constructor.name;

	self.name = name;
	self.target = interceptor;
	self.method = interceptorMethodToCall;

	return self;
};

exports.createInterceptorContext = function(interceptor,interceptorMethodToCall){
	return new InterceptorContext(interceptor,interceptorMethodToCall);
};