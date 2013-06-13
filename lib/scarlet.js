var PrototypeProxy = require('./prototype-proxy');
var ObjectProxy = require('./object-proxy');
var Interceptor = require('./interceptor');

scarlet = (function() {
	'use strict';

	var proxies = [];

	function resetAll() {
		for (var i = 0; i < proxies.length; i++) {
			proxies[i].resetAll();
		}
	}

	function hasValidArguments(numberOfArguments, interceptor, interceptorMethodToCall) {

		if (numberOfArguments >= 2 && !interceptorMethodToCall)
			return false;

		if (numberOfArguments === 1 && !interceptorMethodToCall && !(interceptor instanceof Function))
			return false;

		return true;
	}

	function register(interceptor, interceptorMethodToCall) {
		var self = this;

		if (!hasValidArguments(arguments.length, interceptor, interceptorMethodToCall))
			throw new Error("Cant register undefined interceptor method.  Ensure the interceptor has been instantiated before registration");

		self.interceptor = Interceptor.createInterceptorContext(interceptor, interceptorMethodToCall);

		return {

			interceptor: self.interceptor,

			forObject: function(objectToIntercept) {
				return this.createProxy(objectToIntercept);
			},

			createProxy: function(objectToIntercept) {
				var self = this;

				if (objectToIntercept.prototype) {
					var prototypeProxy = new PrototypeProxy();
					objectToIntercept = prototypeProxy.create(objectToIntercept, self.interceptor);
					proxies.push(prototypeProxy);
				} else {
					var objectProxy = new ObjectProxy();
					objectProxy.create(objectToIntercept, self.interceptor);
					proxies.push(objectProxy);
				}

				return objectToIntercept;
			}
		};
	}

	return function() {
		this.register = register;
		this.resetAll = resetAll;
		this.plugins = this.prototype;
	};

})();

module.exports = new scarlet();