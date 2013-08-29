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
	self.lib = require("./index");

	/**
	 * Extneds the Scarlet properties onto a target object.
	 *
	 * ####Example:
	 *
	 * 
	 * ```javascript
	 * scarlet.extend(someObject);
	 * //-> someObject can now invoke and call scarlet members
	 * ```
	 * 
	 * @category Interception Methods
	 * @method extend
	 * @param {Function|Object} target the object to put the scarlet properties on
	 * @return {Function} A Scarlet interceptor object.
	**/
	self.extend = function(target){
		for(var member in self){
			target[member] = function(){
				return self[member].apply(self,arguments);
			}
		}

		return self;
	}

	/**
	 * Creates a Scarlet interceptor. All Scarlet interceptors are instances of EventEmitter.
	 *
	 * ####Example:
	 *
	 * Basic interceptor
	 * ```javascript
	 * Scarlet.intercept(someFunction);
	 * ```
	 * 
	 * interceptor with events
	 * ```javascript
	 * Scarlet.intercept(someFunction)
	 *        .on('before', beforeFunction)
	 *        .on('after', afterFunction)
	 *        .on('done', doneFunction);
	 * ```
	 * 
	 * @category Interception Methods
	 * @method intercept
	 * @param {Function|Object} typeOrInstance the type or instance to be intercepted
	 * @return {Function} A Scarlet interceptor object.
	**/
	self.intercept = function(typeOrInstance, memberName, asAsync) {

		assert(typeOrInstance, "Cannot have null type or instance");
		assert((typeOrInstance.__scarlet === null || typeof typeOrInstance.__scarlet === 'undefined'), 'Type or instance already contains a scarlet interceptor');

		var self = this;

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		if(asAsync)
			_interceptor.asAsync();

		if(typeOrInstance.hasOwnProperty(memberName))
			return _interceptor.forMember(memberName);
		
		if (typeOrInstance.prototype)
			return  _interceptor.forType();		

		return _interceptor.forObject();
	};

	/**
	 * Creates a Asynchronous Scarlet interceptor. All Scarlet interceptors are instances of EventEmitter.
	 *
	 * ####Example:
	 *
	 * Given an asynchronous interceptor:
	 * ```javascript
	 * function asyncInterceptor(proceed){
	 *     setTimeout(function(){
	 *         //done with long task
	 *         proceed
	 *     },10);
	 * }
	 * ```
	 * 
	 * Basic interceptor
	 * ```javascript
	 * Scarlet.interceptAsync(someFunction)
	 *        .using(asyncInterceptor)
	 * ```
	 * 
	 * interceptor with events
	 * ```javascript
	 * Scarlet.intercept(someFunction)
	 *        .using(asyncInterceptor)
	 *        .on('before', beforeFunction)
	 *        .on('after', afterFunction)
	 *        .on('done', doneFunction);
	 * ```
	 * 
	 * @category Interception Methods
	 * @method intercept
	 * @param {Function|Object} typeOrInstance the type or instance to be intercepted
	 * @return {Function} A Scarlet interceptor object.
	**/
	self.interceptAsync = function(typeOrInstance, memberName) {

		return self.intercept(typeOrInstance,memberName,true);
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
