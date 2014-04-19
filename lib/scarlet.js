var util = require("util");
var events = require("events");
var assert = require("assert");
var logger = require("./extensions/logger");
var Interceptor = require("./interceptors/interceptor");
var PluginManager = require("./plugins/plugin-manager");
var ScarletTrace = require("./extensions/scarletTrace");

/**
For creating a new instance of Scarlet
@namespace scarlet.lib
@method ctor
@param {array|string} pluginArr
@return scarlet.lib.Scarlet
@example
	
	var Scarlet = require("scarlet");
	var scarlet = new Scarlet();

	// A function that does addition
	function add(arg1, arg2){
		return arg1 + arg2;
	}

	// Log arguments and result of add
	add = scarlet
		.intercept(add)
		.using(function(info, method, args){
			console.log("Adding '" + args[0] + "'' and '" + args[1] + "'");
			var result = method.call(this, info, method, args);
			console.log("Result is '" + result + "'");
			return result;
		}).proxy();

	add(1,2); // Output -> Adding '1' and '2'\n Result is '3'
	add(3,5); // Output -> Adding '3' and '5'\n Result is '8'
*/
function Scarlet(pluginArr) {

	"use strict";

	if (!(this instanceof Scarlet))
		return new Scarlet(pluginArr);

	var interceptor = null;
	var pluginManager = new PluginManager();

	var self = this;
	self.plugins = {};
	self.__typename__ = "scarlet.lib.Scarlet";

	/**
		Method for proxying types, functions and instances
		@method intercept
		@param {object} typeOrInstance
		@return {scarlet.lib.Scarlet}
		@chainable
		@example

			var Scarlet = require("scarlet");
			var scarlet = new Scarlet();

			// Type for that we would like to intercept
			function MyClass(){
				var self = this;
				self.myMethod = function(arg1, arg2){
					return arg1 + arg2;
				};
			}

			// First instantiate the type
			var instance = new MyClass();

			// Scarlet will only intercept the instance
			instance = scarlet
				.intercept(instance)
				.using(function(info, method, args){
					return method.call(this, info, method, args);
				}).proxy();

			// Invoke
			var result = instance.myMethod(1,2);
	*/
	self.intercept = function(typeOrInstance, memberName) {
		assert(typeOrInstance, "Please make sure you supply a typeOrInstance parameter. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());");

		logger.info(Scarlet, "intercept", "For Type Or Instance", [typeOrInstance]);
		interceptor = new Interceptor();
		interceptor.observable = typeOrInstance;
		interceptor.intercept(typeOrInstance,
			memberName,
			function(observable) {
				interceptor.observable = observable;
			});
		interceptor.using(self.beforeEventEmitterInterceptor);
		return self;
	};

	/**
		Method for chaining interceptors onto a proxied type or function
		@method using
		@param {Function} callback
		@return {scarlet.lib.Scarlet}
		@chainable
		@example

			var Scarlet = require("scarlet");
			var scarlet = new Scarlet();

			// Type for that we would like to intercept
			function MyClass(){
				var self = this;
				self.myMethod = function(arg1, arg2){
					return arg1 + arg2;
				};
			}

			// First instantiate the type
			var instance = new MyClass();

			// Scarlet will only intercept the instance
			instance = scarlet
				.intercept(instance)
				.using(function(info, method, args){ // Interceptor 1
					return method.call(this, info, method, args);
				})
				.using(function(info, method, args){ // Interceptor 2
					return method.call(this, info, method, args);
				})
				.using(function(info, method, args){ // Interceptor 3
					return method.call(this, info, method, args);
				}).proxy();

			// Invoke
			var result = instance.myMethod(1,2);
	*/
	self.using = function(callback) {
		assert(callback);
		assert(interceptor);
		logger.info(Scarlet, "using", "Using Interceptor", [callback]);
		interceptor.using(callback);
		return self;
	};

	self.beforeEventEmitterInterceptor = function(info, proceed) {
		assert(interceptor);
		self.emit("before", info);
		proceed();
	};


	self.afterEventEmitterInterceptor = function(error, info, proceed) {
		assert(interceptor);
		if (error !== undefined && error !== null) {
			info.error = error;
			self.emit("error", info);
			throw error;
		}

		var result = null;
		try {
			result = proceed();
			self.emit("after", info);
		} catch (exception) {
			info.error = exception;
			self.emit("error", info);
			throw exception;
		}
		self.emit("done", info);
		return result;
	};

	/**
		Method for retrieving a reference to a proxy type, this is for types that need to be instantiated using 'new'
		@method proxy
		@return {Object}
	*/
	self.proxy = function() {
		assert(interceptor);
		assert(interceptor.observable);
		logger.info(Scarlet, "proxy", "As Proxied Type Or Instance", [interceptor.observable]);
		interceptor.using(self.afterEventEmitterInterceptor);
		return interceptor.observable;
	};

	/**
		Method for loading a plugin into scarlet
		@param {String} pluginPath
		@method load
		@return {scarlet.lib.Scarlet}
	*/
	self.load = function(pluginPath) {
		assert(pluginPath);
		pluginManager.load(self, pluginPath);
		return self;
	};

	self.interceptQuery = function(proceed, info) {
		return new ScarletTrace(proceed, info);
	};

	var initializePlugins = function() {
		if (typeof(pluginArr) === "string")
			pluginArr = [pluginArr];
		if (pluginArr) {
			if (pluginArr.length) {
				pluginArr.forEach(function(plugin) {
					self.load(plugin);
				});
			}
		}
	};

	self.on("error", function(error) {
		logger.error(Scarlet, "Event", "error event", [error]);
	});

	initializePlugins();

	events.EventEmitter.call(self);
}

util.inherits(Scarlet, events.EventEmitter);

module.exports = Scarlet;