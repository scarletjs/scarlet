var Interceptor = module.exports = exports = function(){
	var self = this;

	self.interceptors = [];
	self.result = undefined;
	self.nextInterceptorCallId = 0;

	self.target=undefined;
	self.paramaters=undefined;
	self.targetMethod=undefined;

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

Interceptor.prototype.getInvocation = function(){
	var self = this;
	self.nextInterceptorCallId++;

	var invocation = {
		target : self.target,
		method : self.targetMethod,
		paramaters : self.paramaters,
		proceed : function(){ return self.proceed.apply(self); }
	};

	return invocation;
};

Interceptor.prototype.beginInvoke = function(target,paramaters){
	var self = this;

	if(paramaters)
		paramaters =Array.prototype.slice.call(paramaters);

	self.target = target;
	self.paramaters = paramaters;

	return self.proceed();
};

Interceptor.prototype.proceed = function(){
	var self = this;

	if(self.interceptors.length > self.nextInterceptorCallId)
		return self.executeNextInterceptor();

	self.nextInterceptorCallId = 0;
	return self.execute(self.paramaters,self.target,self.targetMethod);
};

Interceptor.prototype.executeNextInterceptor = function(){
	var self = this;

	var interceptor = self.interceptors[self.nextInterceptorCallId];
	var invocation = self.getInvocation();
	var paramaters = [invocation];

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