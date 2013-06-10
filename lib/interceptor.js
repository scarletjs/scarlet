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
	this.interceptors.unshift(nextInterceptor);
	return this;
};

Interceptor.prototype.getInvocation = function(paramaters){
	var self = this;
	self.nextInterceptorCallId++;
	
	var invocation = {
		proceed : function(){ return self.proceed.apply(self,paramaters); },
		method : self.target,
		arguments : paramaters
	};

	return invocation;
};

Interceptor.prototype.proceed = function(){
	var self = this;
	try{
		var lastArg = arguments[arguments.length-1];
		var paramaters = Array.prototype.slice.call(arguments);

		var targetMethod;
		if(self.interceptors.length > self.nextInterceptorCallId){
			targetMethod = self.interceptors[self.nextInterceptorCallId];
			var invocation = self.getInvocation(paramaters);
			paramaters = [invocation];
		}
		else{
			self.nextInterceptorCallId = 0;
			targetMethod = self.target;
		}

		if(!targetMethod)
			return self.result;

		if(!(targetMethod instanceof Function))
			return targetMethod;

		self.result = targetMethod.apply(targetMethod,paramaters);
		
		return self.result;

	}catch(exception){
		throw exception;
	}
};