var assert = require("assert");
var Invocation = require("./invocation");
var ProxyInstance = require("./proxy-instance");
var ProxyPrototype = require("./proxy-prototype");

/**
	Creates an Interceptor for an Object or Function

	@class Interceptor
	@constructor
	@param {Function|Object} typeOrInstance the type or instance to be intercepted
	@required
**/
function Interceptor(typeOrInstance) {

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

	var self = this;

	/**
	 * Target interceptors
     * @property targets
     * @type Array
     */
	self.targets = [];

	/**
	 * Proxy of the object
     * @property proxy
     * @type Function
     */
	self.proxy = null;

	/**
	 * reference to the current target reference
     * @property currentTarget
     * @type Number
     */
	self.currentTarget = 0;

	/**
	 * The type or instance to be intercepted
     * @property type 
     * @type Function|Object
     */
	self.type = typeOrInstance;

	/**
	 * The instance with the proxy interceptor
     * @property proxiedInstance 
     * @type Function|Object
     */
	self.proxiedInstance = null;

	/**
	 * The instance with the proxy interceptor
     * @property proxiedInstance 
     * @type Function|Object
     */
	self.instance = typeOrInstance;

	/**
		Create an interceptor for a function object

		@method asType
		@chainable
		@return {Function} A reference to the current interceptor(self)
	**/
	self.asType = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyPrototype(self);
		initProxy();
		return self;
	};

	/**
		Create an interceptor for an object literal

		@method asObject
		@chainable
		@return {Function} A reference to the current interceptor(self)
	**/
	self.asObject = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");

		self.proxy = new ProxyInstance(self);
		initProxy();
		return self;
	};

	var initProxy = function(){
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before initializing a proxy");

		self.proxiedInstance = self.proxy.whenCalled(function(method, args) {

			var _invocation = new Invocation(self.instance, method, args);

			var next = function(error, result){

				if(self.currentTarget >= self.targets.length){
					self.currentTarget = 0;	
					return _invocation.proceed();
				}

				var targetMethod = self.targets[self.currentTarget];
				self.currentTarget++;
				targetCall(targetMethod);

				return _invocation.result;
			};

			var targetCall = function(target){
				target.targetMethod.apply(target.targetThisContext,[next,_invocation]);
			};

			next();

			return _invocation.result;

		});
	};

	/**
		Attach an interceptor to the type or instance.  Can be chained with multiple using clauses

		@method using
		@param {Function} targetMethod the method to call when the type or instance is intercepted
		@param {Function} targetThisContext the reference to self/this to be used when calling the intercepotr
		@optional
		@chainable
		@return {Function} A reference to the current interceptor(self)
		@example
			function AnyObject() {};
			function interceptor1(proceed) { proceed();}
			function interceptor2(proceed) { proceed();}

			scarlet.intercept(AnyObject) 
					//indicates the first interceptor to be called
					.using(interceptor1)
					//indicates the second interceptor to be called
					.using(interceptor2);

			//-> AnyObject will now have the two interceptors attached
	**/
	self.using = function(targetMethod,targetThisContext) {
		assert(targetMethod, "Cannot have null target for interceptor");

		if(!targetThisContext)
			targetThisContext = self;

		addTarget(targetMethod,targetThisContext);

		return self;
	};

	var addTarget = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.targets.push(target);
	};

	/**
		Provides the type or instance with the added intercepters. This is needed when intercepting a function.

		@method resolve
		@return {Function} A reference to the function being intercepted
		@example
			function AnyObject() {};

			AnyObject = scarlet.intercept(AnyObject)
								.using(interceptor)
								.resolve();

			//-> AnyObject will contain the **interceptor**

	**/
	self.resolve = function(){
		return self.proxiedInstance;
	};

	/**
		Remove all interceptors from the intercepted object

		@method release
		@chainable
		@return {Function} A reference to the current interceptor(self)
	**/
	self.release = function() {
		proxy.unwrap();
		return self;
	};

}

module.exports = Interceptor;