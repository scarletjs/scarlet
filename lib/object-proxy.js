var Proxy = require("./proxy");

var ObjectProxy = module.exports = exports =  function(){
	var self = this;

	self.interceptedObjects = {};
	self.originalObects = {};
};

ObjectProxy.prototype = Object.create(Proxy.prototype);

ObjectProxy.prototype.create = function(objectToIntercept, interceptor){
	var self = this;

	if(objectToIntercept.prototype)
		throw new Error("Can't create proxy because it has a prototype");

	self.saveOriginalObject(objectToIntercept);		
	self.addInterceptor(objectToIntercept,interceptor);
	self.registerInterceptorForObject(objectToIntercept,interceptor);
	return objectToIntercept;
};

ObjectProxy.prototype.saveOriginalObject = function(originalObject){
	var self = this;

	var savedObject = {};
	self.forEachObjectFunction(originalObject,function(property){
		savedObject[property] = originalObject[property];
	});

	var objectName = self.getObjectName(originalObject);
	self.originalObects[objectName] = {
		originalObect : originalObject,
		savedObject : savedObject
	};

	return savedObject;
};

ObjectProxy.prototype.resetAll = function(){
	var self = this;

	for(var savedObjectName in self.originalObects){
		self.reset(savedObjectName);
	}

	self.originalObects = {};
	self.interceptors = {};
};

ObjectProxy.prototype.reset = function(objectNameToReset){
	var self = this;

	var originalObject = self.originalObects[objectNameToReset].originalObect;
	var savedObject = self.originalObects[objectNameToReset].savedObject;

	self.forEachObjectFunction(originalObject,function(property){
		 self.originalObects[objectNameToReset].originalObect[property] = savedObject[property];
	});
};


