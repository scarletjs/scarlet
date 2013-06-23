var l = console.log;
var i = require("util").inspect;

var assert = require("assert");

function Scarlet() {

	"use strict";

	var self = this;

	self.lib = require("./index");

	self.plugins = {};

	self.loadPlugin = function(pluginPath) {
		self.lib.Plugins.loadPlugin(self, pluginPath);
	};

	self.intercept = function(typeOrInstance){
		var self = this;
		
		assert(typeOrInstance, "Cannot have null type or instance");

		if(typeOrInstance.prototype)
			return self.interceptType(typeOrInstance);

		return self.interceptObject(typeOrInstance);
	};

	self.interceptType = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		var _interceptor = new self.lib.Interceptor(typeOrInstance);
		return new _interceptor.asType();
	};

	self.interceptObject = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		var _interceptor = new self.lib.Interceptor(typeOrInstance);
		return _interceptor.asObject();
	};

}

module.exports = new Scarlet();