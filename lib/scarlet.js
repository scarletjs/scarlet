var assert = require("assert");

function Scarlet() {

	"use strict";

	var self = this;

	self.lib = require("./index");

	self.plugins = {};

	var interceptType = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		return new _interceptor.asType();
	};

	var interceptObject = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var _interceptor = new self.lib.Interceptor(typeOrInstance);

		return _interceptor.asObject();
	};

	self.loadPlugin = function(pluginPath) {
		self.lib.Plugins.loadPlugin(self, pluginPath);
	};

	self.intercept = function(typeOrInstance) {

		assert(typeOrInstance, "Cannot have null type or instance");

		var self = this;

		if (typeOrInstance.prototype)
			return interceptType(typeOrInstance);

		return interceptObject(typeOrInstance);
	};

}

module.exports = new Scarlet();