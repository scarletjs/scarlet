var Proxy = require("./proxy");

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
	self.registerInterceptorForObject(objectToIntercept,interceptor);

	return objectToIntercept;
};

PrototypeProxy.prototype.saveOriginalObject = function(originalObject){
	var self = this;

	var savedObject = function(){};

	self.forEachObjectFunction(originalObject.prototype,function(property){
		savedObject.prototype[property] = originalObject.prototype[property];
	});

	var objectName = self.getObjectName(originalObject); 
	self.originalObects[objectName] = {
		originalObect : originalObject,
		savedObject : savedObject
	};
};

PrototypeProxy.prototype.reset = function(){
	var self = this;
	for(var savedObject in self.originalObects){
		self.originalObects[savedObject].originalObect.prototype = Object.create(self.originalObects[savedObject].savedObject.prototype);
	}
	
	self.originalObects = {};
	self.interceptors = {};
};
