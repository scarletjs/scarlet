var Interceptor = module.exports = exports = function(){
	var self = this;

	self.interceptors = [];
	self.nextInterceptorCallId = 0;
	self.result = undefined;
	return self;
};

Interceptor.prototype.intercept = function(targetMethod){
	this.target = targetMethod;
	return this;
};

Interceptor.prototype.by = function(nextInterceptor){
	var self = this;

	self.interceptors.unshift(nextInterceptor);
	return self;
};

Interceptor.prototype.proceed = function(){
	var self = this;
	try{
		var targetMethod;
		if(self.interceptors.length > self.nextInterceptorCallId){
			targetMethod = self.interceptors[self.nextInterceptorCallId];
			self.nextInterceptorCallId++;
		}
		else{
			self.nextInterceptorCallId = 0;
			targetMethod = self.target;
		}

		if(!targetMethod)
			return self.result;

		if(!(targetMethod instanceof Function))
			return targetMethod;

		var lastArg = arguments[arguments.length-1];
		var paramaters = Array.prototype.slice.call(arguments);

		self.result = targetMethod.apply(self,paramaters);
		
		return self.result;

	}catch(exception){
		throw exception;
	}
};