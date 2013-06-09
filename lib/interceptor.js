var Interceptor = module.exports = exports = function(){
	var self = this;

	return self;
};

Interceptor.prototype.functionInvocation = function(targetMethod,parameters){
	var self = this;
	try{
		
		if(!targetMethod)
			return targetMethod;

		if(!(targetMethod instanceof Function))
			return targetMethod;

		if(!parameters)
			parameters = Object.create(arguments);

		var lastArg = parameters[parameters.length-1];
		var parameters = Array.prototype.slice.call(parameters);

		var result = self.proceed(targetMethod,parameters);
		
		return result;

	}catch(exception){
		throw exception;
	}
};

Interceptor.prototype.proceed = function(targetMethod,parameters){
	var self = this;
	
	var result = targetMethod.apply(self,parameters);
	return result;
};