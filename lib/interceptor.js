var Interceptor = module.exports = exports = function(){
	var self = this;

	self.interceptors = [];
	self.result = undefined;
	self.nextInterceptorCallId = 0;

	return self;
};

Interceptor.prototype.intercept = function(targetMethod){
	this.target = targetMethod;
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
		method : self.target,
		paramaters : paramaters,
		thisContext : self.thisContext
	};

	return invocation;
};

Interceptor.prototype.proceed = function(){
	var self = this;
	try{
		if(!paramaters)
			paramaters = [];

		var lastArg = paramaters[paramaters.length-1];
		var paramaters = Array.prototype.slice.call(arguments);

		var targetMethod;
		var targetThisContext;
		if(self.interceptors.length > self.nextInterceptorCallId){
			var interceptor = self.interceptors[self.nextInterceptorCallId];
			targetMethod = interceptor.interceptorMethod;
			targetThisContext = interceptor.thisContext;

			var invocation = self.getInvocation(paramaters);
			paramaters = [invocation];
		}
		else{
			self.nextInterceptorCallId = 0;
			targetMethod = self.target;
			targetThisContext = self.thisContext;
		}

		if(!targetMethod)
			return self.result;

		if(!(targetMethod instanceof Function))
			return targetMethod;

		self.result = targetMethod.apply(targetThisContext,paramaters);
		
		return self.result;

	}catch(exception){
		throw exception;
	}
};

var InterceptorContext = exports.InterceptorContext = function(interceptor,interceptorMethodToCall){
	var self = this;
	if(!interceptorMethodToCall)
		interceptorMethodToCall = interceptor;

	var name = interceptor.name;
	if(!name)
		name = interceptor.constructor.name;

	self.name = name;
	self.thisContext = interceptor;
	self.interceptorMethod = interceptorMethodToCall;

	return self;
};

exports.createInterceptorContext = function(interceptor,interceptorMethodToCall){
	return new InterceptorContext(interceptor,interceptorMethodToCall);
};