require("../include");

var ext = require("./extensions");
var Invocation = require("./invocation");
var ProxyMember = require("./proxy-member");
var ProxyInstance = require("./proxy-instance");
var ProxyPrototype = require("./proxy-prototype");

/**
 * A Scarlet interceptor that emits events.
 *
 * #### Emited Events
 *
 * * before - emitted before *interceptors* are called
 * * after - emitted after *intercepted* method
 * * done - emitted after all *interceptors* and *intercepted* method called
 * 
 * ####Example:
 *
 * Basic interceptor
 * 
 * ```javascript
 * Scarlet.intercept(someFunction)
 *        .using(someInterceptor);
 * ```
 * 
 * Interceptor with events
 * 
 * ```javascript
 * Scarlet.intercept(someFunction)
 *         .on('before', beforeFunction)
 *         .on('after', afterFunction)
 *         .on('done', doneFunction);
 * ```
 * 
 * @category Interception Methods
 * @method intercept
 * @param {Function|Object} typeOrInstance the type or instance to be intercepted
 * @return {Function} A Scarlet interceptor object.
**/
function Interceptor(typeOrInstance) {
	
	"use strict";

	assert(typeOrInstance, "Scarlet::Interceptor::typeOrInstance == null");

	var self = this;

	self.proxy = null;
	self.isAsync = false;
	self.series = ext.series;
	self.proxiedInstance = null;
	self.instance = typeOrInstance;
	self.instanceName = ext.object.getName(typeOrInstance);

	events.EventEmitter.call(this);

	self.asAsync = function(){
		self.isAsync = true;
		return self;
	};

	self.forType = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");
		self.proxy = new ProxyPrototype(self.instance);
		initProxy();
		return self;
	};

	self.forObject = function() {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");
		self.proxy = new ProxyInstance(self.instance);
		initProxy();
		return self;
	};

	self.forMember = function(memberName) {
		assert(self.proxy === null, "Interceptor proxy should only be defined one time using 'asObject()' or 'asType()'");
		assert(memberName !== null, "When defining a member Interceptor must define a member property to intercept");
		self.proxy = new ProxyMember(self.instance,memberName);
		initProxy();
		return self;
	};

	var initProxy = function(){
		assert(self.proxy, "Please make sure you use the 'asObject()' or 'asType()' method before initializing a proxy");
		self.series.addOnDone(function(invocation){ self.emit('done',invocation); }, self);
		self.proxiedInstance = self.proxy.whenCalled(function(instance, member, args, memberName) {
			if(!memberName)
				memberName = self.instanceName;
			var invocation = new Invocation(instance, member, args, memberName,self.instanceName);
			try{
				self.emit('before',invocation);
				if(self.isAsync)
					self.series.invokeAsync(invocation,invocation.proceed);
				else
					self.series.invoke(invocation,invocation.proceed);
				self.emit('after',invocation);
			}catch(exception){
				self.emit('error',exception);
				throw exception;
			}	
			return invocation.result;
		});
	};

	/**
	 * Attach an interceptor to the type or instance.  Can be chained with multiple using clauses
	 *
	 * ####Example:
	 *
	 * ```javascript
	 * function AnyObject() {};
	 * function interceptor1(proceed) { proceed();}
	 * function interceptor2(proceed) { proceed();}
	 * 
	 * scarlet.intercept(AnyObject) 
	 *         .using(interceptor1) //->indicates the first interceptor to be called
	 *         .using(interceptor2); //->indicates the second interceptor to be called
	 *         
	 * //-> AnyObject will now have the two interceptors attached
	 * ```	
	 * 
	 * @category Interception Methods
	 * @method using
	 * @param {Function} targetMethod the method to call when the type or instance is intercepted
	 * @param {Function} targetThisContext the reference to self/this to be used when calling the intercepotr
	 * @chainable
	 * @return {Function} A reference to the current interceptor(self)
	 * 
	**/
	self.using = function(targetMethod,targetThisContext) {
		assert(targetMethod, "Cannot have null target for interceptor");
		if(!targetThisContext)
			targetThisContext = self;
		self.series.addTarget(targetMethod,targetThisContext);
		return self;
	};

	/**
	 * Provides the type or instance with the added intercepters. This is needed when intercepting a function.
	 *
	 * ####Example:
	 *
	 * ```javascript
	 * function AnyObject() {};
	 * 
	 * AnyObject = scarlet.intercept(AnyObject)
	 *                     .using(interceptor)
	 *                     .resolve();
	 *                     
	 * //-> AnyObject will contain the **interceptor**
	 * ```	
	 *
	 * @category Interception Methods
	 * @method resolve
	 * @return {Function} A reference to the function being intercepted
	 * 
	**/
	self.resolve = function(){
		return self.proxiedInstance;
	};

	self.release = function() {
		//TODO: remove all listners
		//self.removeAllListeners("called");
		self.proxy.unwrap();
		return self;
	};

}

Interceptor.prototype = events.EventEmitter.prototype;

module.exports = Interceptor;