var assert = require("assert");

/**
 * Creates a Scarlet Instance
 *
 * #### Example:
 *
 * ```javascript
 * Scarlet
 * 	.intercept(someFunction)
 * 	.using(someInterceptorFunction);
 * 	```
 * 	
 * @category Interception Methods
 * @class Scarlet
 * @constructor
 * @param {Array} pluginArr - optional array of plugins to load
**/
function Scarlet(pluginArr) {

	"use strict";

	var self = this;

	self.lib = require("./index");

	self.plugins = {};

	var interceptType = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		return _interceptor.asType();
	};

	var interceptObject = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		return _interceptor.asObject();
	};

	/**
	 * loads a plugin
	 *
	 * #### Example:
	 *
	 * ```javascript
	 * Scarlet.loadPlugin(someScarletPlugin);
	 * 	```
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

	/**
	 * Creates a Scarlet interceptor
	 *
	 * Example:
	 *
	 * ```javascript
	 * Scarlet.intercept(someFunction);
	 * 	```
	 * 	
	 * @category Interception Methods
	 * @method intercept
	 * @param {Function|Object} typeOrInstance the type or instance to be intercepted
	 * @return {Function} An interceptor object
	**/
	self.intercept = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var self = this;

		if (typeOrInstance.prototype)
			return interceptType(typeOrInstance);

		return interceptObject(typeOrInstance);
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
