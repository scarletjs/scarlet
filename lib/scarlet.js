var g = require("../include");

function Scarlet(pluginArr) {

	"use strict";

	var ProxyType = require("./proxies/proxy-type");
	var Interceptor = require("./interceptors/interceptor");
	var PluginManager = require("./plugins/plugin-manager");

	var interceptor = null;
	var pluginManager = new PluginManager();

	var self = this;
	self.plugins = {};
	self.type = new ProxyType().asUndefined();
	self.__typename__ = "scarlet.lib.Scarlet";

	self.intercept = function(typeOrInstance, proxyType) {
		g.assert(typeOrInstance, "Please make sure you supply a typeOrInstance parameter. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());");
		g.assert(proxyType, "Please make sure you supply a type. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());")
		g.ext.logger.info(Scarlet, "intercept", "For Type Or Instance", [typeOrInstance]);
		interceptor = new Interceptor()
		interceptor.observable = typeOrInstance;
		interceptor.intercept(typeOrInstance, function(observable){
			interceptor.observable = observable;
		}, proxyType);
		return self;
	};

	self.using = function(callback) {
		g.assert(callback);
		g.assert(interceptor);
		g.ext.logger.info(Scarlet, "using", "Using Interceptor", [callback]);
		interceptor.using(callback);
		return self;
	};

	self.proxy = function(){
		g.assert(interceptor);
		g.assert(interceptor.observable);
		g.ext.logger.info(Scarlet, "proxy", "As Proxied Type Or Instance", [interceptor.observable]);
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