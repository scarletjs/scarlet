var g = require("../include");

function Scarlet(pluginArr) {

	"use strict";

	var Interceptor = require("./interceptors/interceptor");
	var PluginManager = require("./plugins/plugin-manager");

	var interceptor = null;
	var pluginManager = new PluginManager();

	var self = this;
	self.plugins = {};
	self.__typename__ = "scarlet.lib.Scarlet";

	self.intercept = function(typeOrInstance) {
		g.assert(typeOrInstance);
		interceptor = new Interceptor()
		interceptor.observable = typeOrInstance;
		interceptor.intercept(typeOrInstance, function(observable){
			interceptor.observable = observable;
		});
		return self;
	};

	self.using = function(callback) {
		g.assert(callback);
		g.assert(interceptor);
		interceptor.using(callback);
		return self;
	};

	self.asProxy = function(){
		g.assert(interceptor);
		g.assert(interceptor.observable);
		return interceptor.observable;
	};

	self.loadPlugin = function(pluginPath) {
		g.assert(pluginPath);
		pluginManager.load(self, pluginPath);
		return self;
	};

	var initializePlugins = function() {
		if (typeof(pluginArr) === 'string')
			pluginArr = [pluginArr];
		if (pluginArr) {
			if (pluginArr.length) {
				pluginArr.forEach(function(plugin) {
					self.loadPlugin(plugin);
				});
			}
		}
	};

	initializePlugins();
}

module.exports = Scarlet;