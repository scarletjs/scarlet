var Interceptor = require("./interceptor.js");

var Proxy = module.exports = exports = function(){
	self.interceptedObjects = {};
	self.originalObects = {};
};

Proxy.prototype.addInterceptor = function(objectToIntercept,interceptor){
	var self = this;

	self.forEachObjectFunction(objectToIntercept,function(property){
		var targetFunction = objectToIntercept[property];
		var functionInterceptor = new Interceptor();
		objectToIntercept[property] = function(){
			return functionInterceptor.beginInvoke(this,arguments);
		};

		functionInterceptor.intercept(targetFunction).by(interceptor);
	});
};

Proxy.prototype.registerInterceptorForObject = function(objectToIntercept,interceptor){
	var self = this;

	var objectName = self.getObjectName(objectToIntercept);
	self.interceptedObjects[objectName] = interceptor.name;
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