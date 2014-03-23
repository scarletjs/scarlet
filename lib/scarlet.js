var util = require("util");
var events = require("events");
var assert = require("assert");
var logger = require("./extensions/logger");
var ProxyType = require("./proxies/proxy-type");
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
		.intercept(add, scarlet.FUNCTION)
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

	var interceptor = null;
	var pluginManager = new PluginManager();

	var self = this;
	self.plugins = {};
	self.type = new ProxyType().asUndefined();
	self.__typename__ = "scarlet.lib.Scarlet";

	self.UNDEFINED = self.type.asUndefined();

	/**
		Constant used to coerce proxy for type only
		@property INSTANCE
		@type scarlet.lib.proxies.ProxyType
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
				.intercept(instance, scarlet.INSTANCE)
				.using(function(info, method, args){
					return method.call(this, info, method, args);
				}).proxy();

			// Invoke
			var result = instance.myMethod(1,2);
	*/
	self.INSTANCE = self.type.asInstance();

	/**
		Constant used to coerce proxy for a normal function
		@property FUNCTION
		@type scarlet.lib.proxies.ProxyType
		@example

			var Scarlet = require("scarlet");
			var scarlet = new Scarlet();

			// Function that we would like to intercept
			function any(arg1, arg2) {
				return arg1 + arg2;
			}

			// Create a proxy of the function using scarlet
			var anyProxy = scarlet
				.intercept(any, scarlet.FUNCTION)
				.using(function(info, method, args){
					// ...
				}).proxy();

			anyProxy(1,2) // -> will invoke interceptor
			any(1,2) // -> wont invoke interceptor
	*/
	self.FUNCTION = self.type.asFunction();

	/**
		Constant used to coerce proxy for prototype functions, includes constructor interception
		@property PROTOTYPE
		@type scarlet.lib.proxies.ProxyType
		@example

			var Scarlet = require("scarlet");
			var scarlet = new Scarlet();

			// Function or prototypical object that we would like to intercept
			function MyClass(){
				var self = this;
				self.anyProperty = 5;
				self.anyMethod = function(){
				};
			}

			MyClass.prototype.anyOtherMethod = function(){
			};

			// Intercept type
			MyClass = scarlet
				.intercept(MyClass)
				.using(function(info, method, args){
					return method.call(this, info, method, args);
				}).proxy();

			var instance = new MyClass(); // -> Calls interceptor for constructor
			instance.anyMethod(); // -> Calls interceptor again for method
			instance.anyOtherMethod(); -> Calls interceptor again for prototype function
			instance.anyProperty = 6; // -> Calls interceptor for the property setter
			var result = instance.anyProperty; // -> Calls the interceptor again for property getter
	*/	
	self.PROTOTYPE = self.type.asPrototype();

	/**
		Method for proxying types, functions and instances
		@method intercept
		@param {object} typeOrInstance
		@param {scarlet.lib.proxies.ProxyType} proxyType
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
				.intercept(instance, scarlet.INSTANCE)
				.using(function(info, method, args){
					return method.call(this, info, method, args);
				}).proxy();

			// Invoke
			var result = instance.myMethod(1,2);
	*/
	self.intercept = function(typeOrInstance, proxyType) {
		assert(typeOrInstance, "Please make sure you supply a typeOrInstance parameter. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());");
		assert(proxyType, "Please make sure you supply a type. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());")

		logger.info(Scarlet, "intercept", "For Type Or Instance", [typeOrInstance]);
		interceptor = new Interceptor()
		interceptor.observable = typeOrInstance;
		interceptor.intercept(typeOrInstance, function(observable) {
			interceptor.observable = observable;
		}, proxyType);
		interceptor.using(self.eventEmitterInterceptor);
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
				.intercept(instance, scarlet.INSTANCE)
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

	self.eventEmitterInterceptor = function(proceed,info) {
		assert(interceptor);
		var thisContext = this;
		self.emit("before", {
			info: info,
			args: info.args,
			result: info.result,
			method: info.method,
			self: info.context
		});
		var result = null;
		try {
			result = proceed();
			self.emit("after", {
				info: info,
				args: info.args,
				result: info.result,
				method: info.method,
				self: info.context
			});
		} catch(err){
			self.emit("error", {
				info: info,
				args: info.args,
				result: info.result,
				method: info.method,
				self: info.context,
				error: err
			});
		}
		self.emit("done", {
			info: info,
			args: info.args,
			result: info.result,
			method: info.method,
			self: info.context
		});
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

	self.interceptQuery = function(proceed, info){
		return new ScarletTrace(proceed, info);
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

	events.EventEmitter.call(self);
}

util.inherits(Scarlet,events.EventEmitter);

module.exports = Scarlet;
