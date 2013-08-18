var assert = require("assert");
var ProxyInstance = require("./proxy-instance");
var inherits = require("./extensions/inherits");
var enumerable = require("./extensions/enumerable");

/**
 * Creates an Proxy for a prototype Function Object
 *
 *Example:
 * 
 * ```javascript
 * //init a scarlet interceptor
 * var interceptor = new Interceptor(someInstance);
 *  		
 * //create the proxyPrototype with the scarlet interceptor
 * var proxy = new ProxyPrototype(interceptor);
 *  		
 * //Set the proxied method to call when the instance gets called
 * someInstance = proxy.whenCalled(function(method,args){
 * 		//-->Do stuff with the method and args of the proxied object
 * });
 * //--> someInance will have the  proxy attached to its prototype
 * ```
 * 
 * @class ProxyPrototype
 * @constructor
 * @param {Function|Object} interceptor the scarlet interceptor to apply
 * 
**/
function ProxyPrototype(interceptor) {

	var self = this;

	/**
	 * The instance with the proxy interceptor
     * @property inheritedType 
     * @type Function|Object
     */
	self.inheritedType = null;

	/**
	 * The scarlet interceptor
     * @property interceptor 
     * @type Function|Object
     */
	self.interceptor = interceptor;

	/**
	 * Creates an Proxy for a prototype Function Object
	 * 
	 * @method whenCalled
	 * @param {Function} target the target method to call when the proxied object is called
	 * @required
	 * @return {Function} the type being intercepted with the proxy attached to the prototype
	 * 
	**/
	self.whenCalled = function(target) {

		assert(interceptor.type, "Scarlet::Interceptor::type == null");
		assert(interceptor.type.prototype, "Cannot use 'asType()' for this object because it does not have a prototype");

		self.inheritedType = function(){

			var self = this;

			(function() {
				var interceptorTypeConstructor = function(){
					var parameters = Array.prototype.slice.call(arguments);
					interceptor.type.apply(self,parameters);

					interceptor.instance = self;

					var proxy = new ProxyInstance(interceptor);
					proxy.whenCalled(target);
				};

				return target(interceptorTypeConstructor,arguments);
			}());

		};

		inherits(self.inheritedType, interceptor.type);
		return self.inheritedType;
		
	};

	self.unwrap = function() {};

}

module.exports = ProxyPrototype;
