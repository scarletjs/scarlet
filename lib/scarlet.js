var assert = require("assert");

/**
 * Creates a Scarlet Instance
 *
 * #### Example:
 *
 * ```javascript
 * Scarlet
 *     .intercept(someFunction)
 *     .using(someInterceptorFunction);
 * ```
 * 
 * @category Interception Methods
 * @class Scarlet
 * @constructor
 * @param {Array} pluginArr - optional array of plugins to load
**/
function Scarlet(pluginArr) {

	"use strict";

	var self = this;
	self.plugins = {};
	self.interceptor = {};
	self.lib = require("./index");

	/**
	 * Creates a Scarlet interceptor
	 *
	 * ####Example:
	 *
	 * ```javascript
	 * Scarlet.intercept(someFunction);
	 * ```
	 * 
	 * @category Interception Methods
	 * @method intercept
	 * @param {Function|Object} typeOrInstance the type or instance to be intercepted
	 * @return {Function} An interceptor object
	**/
	self.intercept = function(typeOrInstance, memberName) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var self = this;

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		if(typeOrInstance.hasOwnProperty(memberName))
			self.interceptor = _interceptor.forMember(memberName);
		else if (typeOrInstance.prototype)
			self.interceptor =  _interceptor.forType();
		else
			self.interceptor = _interceptor.forObject();

		return self;
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
			targetThisContext = self.interceptor;

		self.interceptor.addTarget(targetMethod,targetThisContext);

		return self;
	};

	self.after = function(targetMethod,targetThisContext) {
		assert(targetMethod, "Cannot have null target for interceptor");

		if(!targetThisContext)
			targetThisContext = self.interceptor;

		self.interceptor.addAfter(targetMethod,targetThisContext);

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
		return self.interceptor.proxiedInstance;
	};

	self.release = function() {
		self.interceptor.proxy.unwrap();
		return self;
	};

	/**
	 * loads a plugin
	 *
	 * #### Example:
	 *
	 * ```javascript
	 * Scarlet.loadPlugin(someScarletPlugin);
	 * ```
	 * 
	 * @category Interception Methods
	 * @method loadPlugin
	 * @param {Function|Object} pluginPath the plugin to be loaded
	 * @return {Function} A reference to scarlet(self)
	 * @chainable
	**/
	self.loadPlugin = function(pluginPath) {
		self.lib.Plugins.loadPlugin(self, pluginPath);
		return self;
	};

	if(pluginArr){
		if (pluginArr.length) {
			pluginArr.forEach(function(plugin){
				self.loadPlugin(plugin);
			});
		}		
	}

}

module.exports = Scarlet;
