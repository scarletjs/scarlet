var Proxy = require("./proxy");
var Interceptor = require("./interceptor.js");

var PrototypeProxy = module.exports = exports =  function(){
	var self = this;

	self.interceptedObjects = {};
	self.originalObects = {};
};

PrototypeProxy.prototype = Object.create(Proxy.prototype);

PrototypeProxy.prototype.create = function(objectToIntercept, interceptor){
	var self = this;

	if(!objectToIntercept.prototype)
		throw new Error("Can't create ObjecteProxy for Object because it is not a prototype");

	self.saveOriginalObject(objectToIntercept);
	self.addInterceptor(objectToIntercept.prototype,interceptor);
	objectToIntercept = self.addConstructorInterceptor(objectToIntercept,interceptor);
	self.registerInterceptorForObject(objectToIntercept,interceptor);

	return objectToIntercept;
};

PrototypeProxy.prototype.addConstructorInterceptor = function(objectToIntercept,interceptor){
	if(objectToIntercept instanceof Function){
		
		var targetFunction = objectToIntercept;
		var functionInterceptor = new Interceptor();
		var InterceptedObject = function(){
			return functionInterceptor.proceed(arguments);
		};
		functionInterceptor.intercept(objectToIntercept).by(interceptor);
		InterceptedObject.prototype = Object.create(objectToIntercept.prototype);
		objectToIntercept = InterceptedObject;
	}

	return objectToIntercept;
};

PrototypeProxy.prototype.saveOriginalObject = function(originalObject){
	var self = this;

	var savedObject = function(){};

	if(originalObject instanceof Function)
		savedObject.prototype = Object.create(originalObject.prototype);

	self.forEachObjectFunction(originalObject.prototype,function(property){
		savedObject.prototype[property] = originalObject.prototype[property];
	});

	var objectName = self.getObjectName(originalObject); 
	self.originalObects[objectName] = {
		originalObect : originalObject,
		savedObject : savedObject
	};

	return savedObject;
};

PrototypeProxy.prototype.resetAll = function(){
	var self = this;
	for(var savedObjectName in self.originalObects){
		self.reset(savedObjectName);
	}
	
	self.originalObects = {};
	self.interceptors = {};
};

PrototypeProxy.prototype.reset = function(savedObjectName){
	var self = this;
	
	var originalObject = self.originalObects[savedObjectName].originalObect.prototype;
	var savedObject = self.originalObects[savedObjectName].savedObject.prototype;

	self.forEachObjectFunction(originalObject,function(property){
		self.originalObects[savedObjectName].originalObect.prototype = Object.create(savedObject);
	});
};
