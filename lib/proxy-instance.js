var enumerable = require("./extensions/enumerable");

/**
 * Creates an Proxy for an instance or object
 *
 * Example:
 * 
 * ```javascript
 * //init a scarlet interceptor
 * var interceptor = new Interceptor(someInstance);
 * 
 * //create the ProxyInstance with the scarlet interceptor
 * var proxy = new ProxyInstance(interceptor);
 * 		
 * //Set the proxied method to call when the instance gets called
 * proxy.whenCalled(function(method,args){
 * 		//-->Do stuff with the method and args of the proxied object
 * });		
 * //--> someInance will now call the proxy when it's called
 * ```
 * 
 * @class ProxyInstance
 * @constructor
 * @param {Function|Object} interceptor the scarlet interceptor to apply
 *
 * 
**/
function ProxyInstance(interceptor) {

	var self = this;

	/**
	 * The scarlet interceptor
     * @property interceptor 
     * @type Function|Object
     */
	self.interceptor = interceptor;


	/**
	 * Creates an Proxy for a instance
	 * 
	 * @method whenCalled
	 * @param {Function} target the target method to call when the proxied object is called
	 * @required
	 * @return {Function} the type being intercepted with the proxy attached to the instance
	**/
	self.whenCalled = function(target) {
		if (!interceptor.instance.__scarlet) {

			interceptor.instance.__scarlet = {};

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				self.interceptor.instance.__scarlet[memberName] = self.interceptor.instance[memberName];

				createPropertyProxy(member, memberName, target);

				createFunctionProxy(member, memberName, target);

			});
		}

		return interceptor.instance;
	};

	var createPropertyProxy = function(member,memberName,target){
		if (interceptor.instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName !== "__scarlet") && (memberName !== "__typename")) {

			self.interceptor.instance[memberName] = Object.defineProperty(interceptor.instance, memberName, {

				configurable: true,

				get: function(){
					return target(function(){
						return self.interceptor.instance.__scarlet[memberName];
					}, self.interceptor.instance.__scarlet[memberName]);
				},
				
				set: function(value){
					target(function(){
						self.interceptor.instance.__scarlet[memberName] = value;	
					}, value);
				}
				
			});
		} else if (interceptor.instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName === "__typename")) {
			self.interceptor.instance.__typename = self.interceptor.instance.__scarlet.__typename;
		}
	};

	var createFunctionProxy = function(member,memberName,target){
		if (member instanceof(Function)) {
			var originalMethod = self.interceptor.instance.__scarlet[memberName];
			
			self.interceptor.instance[memberName] = function() {
				return target(originalMethod, arguments);
			};

		}
	};

	self.unwrap = function() {

		if (interceptor.instance.__scarlet) {

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				if (member instanceof Function) {
					var originalMethod = interceptor.instance.__scarlet[memberName];
					interceptor.instance[memberName] = originalMethod;
				}

			});
		}

	};

}

module.exports = ProxyInstance;