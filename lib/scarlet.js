var PrototypeProxy = require('./prototype-proxy');
var ObjectProxy = require('./object-proxy');

(function(exports){
	var proxies = [];
	
	exports.reset = function(object){
		for (var i = 0; i < proxies.length; i++) {
			proxies[i].reset();
		};
	};

	exports.register = function(interceptor){
		var self = this;

		self.interceptor = interceptor;

		if(interceptor.prototype)
			self.interceptor = Object.create(interceptor.prototype);

		return { 
			interceptor : self.interceptor,
			forObject : function(objectToIntercept){		
				return this.createProxy(objectToIntercept);
			},
			createProxy : function(objectToIntercept){
				var self = this;

				if(hasInterceptor(objectToIntercept,self.interceptor))
					throw new Error("Unable to register multiple interceptors for an object");

				if(objectToIntercept.prototype){
					var prototypeProxy = new PrototypeProxy();
					prototypeProxy.create(objectToIntercept,self.interceptor);
					proxies.push(prototypeProxy);
				}
				else{
					var objectProxy = new ObjectProxy();
					objectProxy.create(objectToIntercept,self.interceptor);
					proxies.push(objectProxy);
				}

				return objectToIntercept;
			}
		};
	};
	
	var hasInterceptor = function(objectToIntercept,interceptor){

		for (var i = 0; i < proxies.length; i++) {
			var objectName = proxies[i].getObjectName(objectToIntercept);
			var interceptorName = proxies[i].getObjectName(interceptor);
			var objectInterceptorName = proxies[i].interceptors[objectName];

			if(objectInterceptorName === interceptorName)
				return true;
		};

		return false;
	};

})(exports);
