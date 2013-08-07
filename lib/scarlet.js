var assert = require("assert");

/**
	Creates a Scarlet Instance

	@class Scarlet
	@constructor
	@param {Array} pluginArr the array of plugins to load
	@optional
	@example
		Scarlet
			.intercept(someFunction)
			.using(someInterceptorFunction);

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

	self.loadPlugin = function(pluginPath) {
		self.lib.Plugins.loadPlugin(self, pluginPath);
		return self;
	};

	/**
		Creates a Scarlet interceptor

		@method intercept
		@param {Function|Object} typeOrInstance the type or instance to be intercepted
		@return {Function} An interceptor object
		@example
			Scarlet.intercept(someFunction);
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
