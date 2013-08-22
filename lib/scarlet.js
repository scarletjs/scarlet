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
		assert(typeOrInstance.__scarlet === null || typeOrInstance.__scarlet === undefined, 'Type or instance already contains a scarlet interceptor');

		var self = this;

		var _interceptor = new self.lib.Interceptor(typeOrInstance);


		if(typeOrInstance.hasOwnProperty(memberName))
			return _interceptor.forMember(memberName);
		
		if (typeOrInstance.prototype)
			return  _interceptor.forType();		

		return _interceptor.forObject();
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
