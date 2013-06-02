var Interceptor = module.exports = exports = function(){
	var self = this;

	return self;
};

Interceptor.prototype.functionInvocation = function(targetMethod,parameters){
	var self = this;
	try{
		
		if(!targetMethod)
			return targetMethod;

		if(!targetMethod instanceof Function)
			return targetMethod;

		if(!parameters)
			parameters = [];

		var result = self.proceed(targetMethod,parameters);
		
		return result;

	}catch(exception){
		throw exception;
	}
};

Interceptor.prototype.proceed = function(targetMethod,parameters){
	var self = this;

	if(!parameters)
		parameters = [];
	
	parameters = self.toArgumentArray(parameters);

	var result = targetMethod.apply(self,parameters);
	return result;
};

Interceptor.prototype.toArgumentArray = function(parametersObject){
	if(!parametersObject)
		return parametersObject;

	if(!parametersObject[0])
		return [parametersObject];

	var parameters = []; 
    for (var i = 0; i < parametersObject.length; i++) 
        parameters[i] = parametersObject[i]; 

    return parameters;
};