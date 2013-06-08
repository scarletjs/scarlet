var Proxy = module.exports = exports = function(){
	self.interceptedObjects = {};
	self.originalObects = {};
};

Proxy.prototype.addInterceptor = function(objectToIntercept,interceptor){
	var self = this;

	if(!interceptor.functionInvocation instanceof Function) return;

	self.forEachObjectFunction(objectToIntercept,function(property){
		var targetFunction = objectToIntercept[property];
		objectToIntercept[property] = function(){
			return interceptor.functionInvocation(targetFunction,arguments);
		};
	});
};

Proxy.prototype.registerInterceptorForObject = function(objectToIntercept,interceptor){
	var self = this;

	var objectName = self.getObjectName(objectToIntercept);
	self.interceptedObjects[objectName] = self.getObjectName(interceptor);
};

Proxy.prototype.forEachObjectFunction = function(object,onFunctionFound){
	for(var property in object){
		if(object[property] instanceof Function){
			onFunctionFound(property);
		}
	}
};

Proxy.prototype.getObjectName = function(object){
	var name = object.name;
	if(!name)
		name = object.constructor.name;

	return name;
};