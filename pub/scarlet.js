!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.scarlet=e():"undefined"!=typeof global?global.scarlet=e():"undefined"!=typeof self&&(self.scarlet=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var log = console.log;
var util = require("util");
var print = util.print;
var inspect = util.inspect;

module.exports = {
	l: log,
	p: print,
	i: inspect,
	util: require("util"),
	path: require("path"),
	assert: require("assert"),
	events: require("events"),
	ext: require("./lib/extensions"),
	ll: function(val) { log(inspect(val)); }
};


},{"./lib/extensions":4,"assert":18,"events":21,"path":24,"util":26}],2:[function(require,module,exports){
module.exports = require("./lib/scarlet.js");

},{"./lib/scarlet.js":17}],3:[function(require,module,exports){
function Enumerable() {

	"use strict";

	var self = this;
	self.__typename__ = "scarlet.lib.extensions.Enumerable";

	self.arrayFor = function(array, callback) {
		for (var i = 0; i < array.length; i++) {
			callback(array[i], i, array);
		}
	};

	self.funcFor = function(object, callback) {
		for (var key in object) {
			callback(object[key], key, object);
		}
	};

	self.stringFor = function(string, callback) {
		self.arrayFor(string.split(""), function(chr, index) {
			callback(chr, index, string);
		});
	};

	self.allEach = function(object, callback) {
		Object.getOwnPropertyNames(object).forEach(function(property) {
			callback(object[property], property, object);
		});
	};

	self.forEach = function(object, callback) {
		if (object) {
			var resolve = self.funcFor;
			if (object instanceof Function) {
				resolve = self.funcFor;
			} else if (typeof object == "string") {
				resolve = self.stringFor;
			} else if (typeof object.length == "number") {
				resolve = self.arrayFor;
			}
			resolve(object, callback);
		}
	};

	self.where = function(object, predicateCallback) {
		var results = [];
		self.forEach(object, function(element){
			if (predicateCallback(element))
				results.push(element);			
		});
		return results;
	};

	self.first = function(object, predicateCallback) {
		if (typeof(predicateCallback) == "undefined" && typeof(object) != "undefined" && object.length > 0){
			return object[0];
		};
		var results = self.where(object, predicateCallback);
		if (results.length > 0)
			return results[0];
		return null;
	};

}

module.exports = new Enumerable();
},{}],4:[function(require,module,exports){
module.exports = {
	object: require("./object"),
	enumerable: require("./enumerable"), 
	logger: require("./logger")
};
},{"./enumerable":3,"./logger":5,"./object":6}],5:[function(require,module,exports){
function Logger() {

	"use strict";

	var g = {};

	g.util = require("util");
	g.assert = require("assert");
	g.object = require("./object");

	g.log = console.log;
	g.print = g.util.print;
	g.inspect = g.util.inspect;

	g.l = g.log;
	g.i = g.inspect;
	g.ll = function(val) { g.l(g.i(val)); } 

	var self = this;
	self.DEBUG = 4;
	self.INFO = 3;
	self.WARN = 2;
	self.ERROR = 1;
	self.logLevel = self.WARN;

	var getFunctionName = function(func) {
		
		if (typeof(func) == "string")
			return func;
		
		var ret = func.toString();
		ret = ret.substr('function '.length);
		ret = ret.substr(0, ret.indexOf('('));
		
		if (ret === "" || ret == null || typeof(ret) == "undefined")
			ret = "function<anonymous>";
		
		return ret;
	};

	var getParamNames = function(func) {

		var ret = ""

		if (typeof(func) == "string") {
			ret += func;
		} else if (typeof(func) != "string") {
			ret = func.toString();
		}

		if (ret == "[object Object]")
			ret += "";

		var firstBracketIndex = ret.indexOf("(");
		var lastBracketIndex = ret.indexOf(")");

		if (firstBracketIndex === -1 || lastBracketIndex === -1)
			return [];

		ret = ret.slice(ret.indexOf("(") + 1, ret.indexOf(")"));
		return ret.split(",");
	}

	self.print = function(type, obj, func, msg, args) {

		if (args == null)
			args = "";
		else
			args = "\n" + g.i(args).replace(/\n/g, "\n");

		if (typeof(msg) == "object" || typeof(msg) == "function")
			msg = g.i(msg, {
				depth: 10,
				showHidden: true
			});

		if (typeof(func) == "string" && !g.object.isNull(obj) && !g.object.isNull(obj[func])) {
			var funcName = func;
			var actualFunc = obj[func];
			g.l(type + getFunctionName(obj) + "::" + funcName + "(" + getParamNames(actualFunc).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!g.object.isNull(obj) && g.object.isNull(func)) {
			g.l(type + getFunctionName(func) + "(" + getParamNames(obj).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (g.object.isNull(obj) && !g.object.isNull(func)) {
			g.l(type + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!g.object.isNull(obj) && !g.object.isNull(func)) {
			g.l(type + getFunctionName(obj) + "::" + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
			return;
		}
	};

	self.debug = function(obj, func, msg, args) {
		if (self.logLevel == self.DEBUG)
			self.print("DEBUG @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.info = function(obj, func, msg, args) {
		if (self.logLevel >= self.INFO)
			self.print("INFO  @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.warn = function(obj, func, msg, args) {
		if (self.logLevel >= self.WARN)
			self.print("WARN  @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.error = function(obj, func, msg, args) {
		if (self.logLevel >= self.ERROR)
			self.print("ERROR @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

}

module.exports = new Logger();
},{"./object":6,"assert":18,"util":26}],6:[function(require,module,exports){
function ObjectExtended() {

	"use strict";

	var self = this;
	var enumerable = require("./enumerable");
	self.__typename__ = "scarlet.lib.extensions.Object";

	self.has = function(obj, key){
		return hasOwnProperty.call(obj, key);
	};

	self.isObject = function(obj){
		return obj instanceof Object;
	};

	self.isFunction = function(obj) {
		return obj instanceof Function;
	};

	self.isNull = function(obj) {
		if (typeof(obj) === "object")
			return obj === null;
		return typeof(obj) === "undefined";
	}

	self.inherit = function(child, parent) {
		child.__super__ = parent;
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: child,
				writable: true,
				enumerable: false,
				configurable: true
			}
		});
	};
}

module.exports = new ObjectExtended();
},{"./enumerable":3}],7:[function(require,module,exports){
var g = require("../../include");

function Interceptor() {

	"use strict";

	var ProxyInterceptor = require("../proxies/proxy-interceptor");

	var self = this;
	self.proxy = null;
	self.interceptors = [];
	self.__typename__ = "scarlet.lib.interceptors.Interceptor";

	var getConcreteMethod = function(thisContext, concreteMethod) {
		return function(info, ignoreThisMethod, args) {
			return concreteMethod.apply(thisContext, args);
		};
	};

	var getInterceptorMethod = function(callback, interceptor, thisContext) {
		return function(info, ignoreThisMethod, args) {
			return interceptor.call(thisContext, info, callback, args);
		};
	};

	var createCallback = function(interceptor, callback, thisContext, concreteMethod) {
		if (callback == null && interceptor == null) {
			return getConcreteMethod(thisContext, concreteMethod);
		} else {
			return getInterceptorMethod(callback, interceptor, thisContext);
		}
	};

	var whenProxyCalled = function(info, method, args) {
		g.assert(self.interceptors.length > 0, "Please make sure you add an interceptor");
		var thisContext = this;
		var previousCallback = null;
		var previousInterceptor = null;
		// TODO: Which interceptor gets bias here? First or Last? Might want to surface this via API.
		// TODO: self.interceptors.reverse() || self.interceptors
		g.ext.enumerable.forEach(self.interceptors, function(interceptor, index) {
			previousCallback = createCallback(previousInterceptor, previousCallback, thisContext, method);
			previousInterceptor = interceptor;
		});
		return previousInterceptor.call(thisContext, info, previousCallback, args);
	};

	self.intercept = function(typeOrInstance, replaceTypeCallback, proxyType) {
		g.assert(proxyType);
		g.assert(typeOrInstance);
		g.assert(replaceTypeCallback);
		self.proxy = new ProxyInterceptor(typeOrInstance);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback, proxyType);
		g.ext.logger.info(Interceptor, "intercept", "For Type or Instance", [typeOrInstance]);
		return self;
	};

	self.using = function(whenCalled) {
		g.assert(self.proxy, "Please make sure you are intercepting something first");
		self.interceptors.push(whenCalled);
		g.ext.logger.info(Interceptor, "using", "Using Interceptor", [whenCalled]);
		return self;
	};
}

module.exports = Interceptor;
},{"../../include":1,"../proxies/proxy-interceptor":12}],8:[function(require,module,exports){
var __dirname="/lib/plugins";var g = require("../../include");

function PluginManager() {
	
	"use strict";

	var self = this;
	self.directoryPath = __dirname + "/../../";

	self.setDirectory = function(directoryPath){
		self.directoryPath = directoryPath;
	};
	
	self.load = function($scarlet, pluginDirectoryPath) {
		g.assert($scarlet);
		var fullPath = g.path.normalize(self.directoryPath + pluginDirectoryPath);
		var ScarletPlugin = require(fullPath);
		var pluginObject = new ScarletPlugin($scarlet);
		pluginObject.initialize();
		return pluginObject;
	};

}

module.exports = PluginManager;
},{"../../include":1}],9:[function(require,module,exports){
var g = require("../../include");

function ProxyFunction(proxyInfo, whenCalled) {

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyFunction";

	self.wrap = function(replaceFunctionCallback) {
		g.ext.logger.info(ProxyFunction, "wrap", "Wrapping Proxy Function", [self.proxyInfo]);
		var actualFunction = self.proxyInfo.instanceOrType;
		var proxiedFunction = function() {
			var args = Array.prototype.slice.call(arguments);
			self.proxyInfo.setIsFunction(true);
			return self.whenCalled.call(
				self.proxyInfo.instanceOrType,
				self.proxyInfo,
				actualFunction,
				args);
		};

		proxiedFunction.__scarlet__ = {};
		proxiedFunction.__scarlet__.__function__ = actualFunction;
		self.proxyInfo.instanceOrType = proxiedFunction;

		if (replaceFunctionCallback)
			replaceFunctionCallback(proxiedFunction);

		return self;
	};

	self.unwrap = function() {
		return self;
	};

}

module.exports = ProxyFunction;

},{"../../include":1}],10:[function(require,module,exports){
var g = require("../../include");

function ProxyInfo(instanceOrType, memberName) {

	"use strict";

	g.assert(instanceOrType);

	var self = this;
	self.__isMethod__ = false;
	self.__isFunction__ = false;
	self.__isProperty__ = false;
	self.__isPrototype__ = false;
	self.__isConstructor__ = false;
	self.memberName = memberName;
	self.instanceOrType = instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyInfo";

	self.isAllowed = function() {
		var result = memberName != "__scarlet__";
		g.ext.logger.debug(ProxyInfo, "isAllowed", "Is Allowed For Proxy?", [result]);
		return result;
	};

	self.ensureShadow = function() {
		if (!self.isPrototype() && !g.ext.object.has(self.instanceOrType, "__scarlet__"))
			self.instanceOrType.__scarlet__ = {};
		g.ext.logger.debug(ProxyInfo, "ensureShadow", "Shadow Object Created", [self.instanceOrType]);
		return self;
	};

	self.isConstructor = function(){
		return self.__isConstructor__;
	};

	self.setIsConstructor = function(value) {
		self.__isConstructor__ = value;
	};

	self.getIsConstructor = function(){
		return self.__isConstructor__;
	};

	self.isMethod = function() {
		var result = !g.ext.object.isNull(self.instanceOrType) && !g.ext.object.isNull(self.memberName) && !g.ext.object.isNull(self.instanceOrType[memberName]) && g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isMethod", "Is Method?", [result]);
		return result;
	};

	self.setIsMethod = function(value) {
		self.__isMethod__ = value;
	};

	self.getIsMethod = function(){
		return self.__isMethod__;
	}

	self.isFunction = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isFunction", "Is Function?", [result]);
		return result;
	};

	self.setIsFunction = function(value) {
		self.__isFunction__ = value;
	};

	self.getIsFunction = function(){
		return self.__isFunction__;
	};

	self.isProperty = function() {
		var result = !g.ext.object.isFunction(self.instanceOrType[self.memberName]);
		g.ext.logger.info(ProxyInfo, "isProperty", "Is Property?", [result]);
		return result;
	};

	self.setIsProperty = function(value) {
		self.__isProperty__ = value;
	};

	self.getIsProperty = function(){
		return self.__isProperty__;
	};

	self.isInstance = function() {
		this.isFunction();
		var result = g.ext.object.isNull(memberName) && g.ext.object.isObject(self.instanceOrType);
		g.ext.logger.info(ProxyInfo, "isInstance", "Is Instance?", [result]);
		return result;
	};

	self.isPrototype = function() {
		var result = g.ext.object.isNull(memberName) && g.ext.object.isFunction(self.instanceOrType) && !g.ext.object.isNull(self.instanceOrType.prototype);
		g.ext.logger.info(ProxyInfo, "isPrototype", "Is Prototype?", [result]);
		return result;
	};

	self.setIsPrototype = function(value){
		self.__isPrototype__ = value;
	};

	self.getIsPrototype = function(){
		return self.__isPrototype__;
	};

	self.hasMember = function() {
		return !g.ext.object.isNull(self.memberName);
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;

},{"../../include":1}],11:[function(require,module,exports){
var g = require("../../include");

function ProxyInstance(instance, whenCalled) {

	"use strict";

	g.assert(instance);
	g.assert(whenCalled);

	var ProxyInfo = require("./proxy-info");
	var ProxyMethod = require("./proxy-method");
	var ProxyProperty = require("./proxy-property");

	var self = this;
	self.instance = instance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInstance";

	var anyMembers = function() {
		var count = 0;
		g.ext.enumerable.forEach(self.instance, function(member, memberName) {
			count += 1;
		});
		return count != 0;
	};

	var eachMember = function(callback) {
		g.ext.logger.info(eachMember, eachMember, "For Each Member", [self.instance]);
		g.ext.enumerable.forEach(self.instance, function(member, memberName) {
			g.assert(memberName);
			g.ext.logger.info(eachMember, eachMember, "For Each Member::Current=" + g.i(member) + " -> " + memberName + "", [self.instance]);
			if (!g.ext.object.isNull(callback))
				callback(self.instance, memberName);
		});
	};

	self.wrap = function() {
		g.ext.logger.info(ProxyInstance, "wrap", "Wrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.isAllowed()) {
				if (proxyInfo.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).wrap();
				} else if (proxyInfo.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).wrap();
				}
			}
		});
		return self;
	};

	self.unwrap = function() {
		g.ext.logger.info(ProxyInstance, "unwrap", "Unwrapping Instance", [self.instance]);
		eachMember(function(instance, memberName) {
			var proxyInfo = new ProxyInfo(self.instance, memberName);
			if (proxyInfo.isAllowed()) {
				if (proxyInfo.isMethod()) {
					new ProxyMethod(proxyInfo, whenCalled).unwrap();
				} else if (proxyInfo.isProperty()) {
					new ProxyProperty(proxyInfo, whenCalled).unwrap();
				}
			}
		});
		return self;
	};
}

module.exports = ProxyInstance;

},{"../../include":1,"./proxy-info":10,"./proxy-method":13,"./proxy-property":14}],12:[function(require,module,exports){
var g = require("../../include");

function ProxyInterceptor(typeOrInstance, memberName) {

	"use strict";

	g.assert(typeOrInstance);

	g.events.EventEmitter.call(self);

	var ProxyType = require("./proxy-type");
	var ProxyInfo = require("./proxy-info");
	var ProxyMethod = require("./proxy-method");
	var ProxyProperty = require("./proxy-property");
	var ProxyInstance = require("./proxy-instance");
	var ProxyFunction = require("./proxy-function");
	var ProxyPrototype = require("./proxy-prototype");

	var self = this;
	self.info = null;
	self.interceptor = null;
	self.memberName = memberName;
	self.typeOrInstance = typeOrInstance;
	self.__typename__ = "scarlet.lib.proxies.ProxyInterceptor";

	var interceptInstance = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyInstance(self.typeOrInstance, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Instance", [self.interceptor]);
	};

	var interceptMethod = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyMethod(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Method", [self.interceptor]);
	};

	var interceptProperty = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyProperty(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Property", [self.interceptor]);
	};

	var interceptPrototype = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyPrototype(self.typeOrInstance, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Prototype", [self.interceptor]);
	};

	var interceptFunction = function(whenCalledCallback, replaceClassCallback) {
		self.interceptor = new ProxyFunction(self.info, whenCalledCallback);
		g.ext.logger.info(ProxyInterceptor, "intercept", "Using a Proxy Function", [self.interceptor]);
	};

	self.intercept = function(whenCalledCallback, replaceClassCallback, proxyType) {
		g.assert(proxyType);
		g.assert(whenCalledCallback);
		g.assert(replaceClassCallback);

		self.info = new ProxyInfo(self.typeOrInstance, self.memberName);
		g.ext.logger.info(ProxyInterceptor, "intercept", "For Type Or Instance", [typeOrInstance, whenCalledCallback, proxyType]);

		if (proxyType.is(proxyType.asPrototype())) {
			interceptPrototype(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asInstance())) {
			interceptInstance(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asMethod())) {
			interceptMethod(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asProperty())) {
			interceptProperty(whenCalledCallback, replaceClassCallback);
		} else if (proxyType.is(proxyType.asFunction())) {
			interceptFunction(whenCalledCallback, replaceClassCallback);
		}

		self.interceptor.wrap(replaceClassCallback);
	};

	self.release = function() {
		if (!g.ext.object.isNull(self.interceptor))
			self.interceptor.unwrap();
	};
}

g.util.inherits(ProxyInterceptor, g.events.EventEmitter);

module.exports = ProxyInterceptor;

},{"../../include":1,"./proxy-function":9,"./proxy-info":10,"./proxy-instance":11,"./proxy-method":13,"./proxy-property":14,"./proxy-prototype":15,"./proxy-type":16}],13:[function(require,module,exports){
var g = require("../../include");

function ProxyMethod(proxyInfo, whenCalled) {

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyMethod";

	self.wrap = function() {
		self.proxyInfo.instanceOrType.__scarlet__[self.proxyInfo.memberName] = self.proxyInfo.instanceOrType[self.proxyInfo.memberName];
		self.proxyInfo.instanceOrType[self.proxyInfo.memberName] = function() {
			var args = Array.prototype.slice.call(arguments);
			self.proxyInfo.setIsMethod(true);
			return self.whenCalled.call(
				self.proxyInfo.instanceOrType,
				self.proxyInfo,
				self.proxyInfo.instanceOrType.__scarlet__[self.proxyInfo.memberName],
				args);
		};
		return self;
	};

	self.unwrap = function() {
		delete proxyInfo.instanceOrType[proxyInfo.memberName];
		proxyInfo.instanceOrType[proxyInfo.memberName] = proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		return self;
	};

}

module.exports = ProxyMethod;

},{"../../include":1}],14:[function(require,module,exports){
var g = require("../../include");

function ProxyProperty(proxyInfo, whenCalled) {

	"use strict";

	g.assert(proxyInfo);
	g.assert(whenCalled);

	var self = this;
	self.proxyInfo = proxyInfo;
	self.__typename__ = "scarlet.lib.proxies.ProxyProperty";

	var invokeWhenCalledForGet = function() {
		self.proxyInfo.setIsProperty(true);
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function() {
			return proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		});
	};

	var invokeWhenCalledForSet = function(value) {
		self.proxyInfo.setIsProperty(true);
		return whenCalled.call(self.proxyInfo.instanceOrType, self.proxyInfo, function() {
			proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName] = value;
		});
	};

	self.wrap = function() {
		proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName] = proxyInfo.instanceOrType[proxyInfo.memberName];
		Object.defineProperty(
			proxyInfo.instanceOrType, proxyInfo.memberName, {
				get: function() {
					return invokeWhenCalledForGet();
				},
				set: function(value) {
					invokeWhenCalledForSet(value);
				}
			});
		return self;
	};

	self.unwrap = function() {
		delete proxyInfo.instanceOrType[proxyInfo.memberName];
		proxyInfo.instanceOrType[proxyInfo.memberName] = proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		delete proxyInfo.instanceOrType.__scarlet__[proxyInfo.memberName];
		return self;
	};
}

module.exports = ProxyProperty;

},{"../../include":1}],15:[function(require,module,exports){
var g = require("../../include");

function ProxyPrototype(type, whenCalled) {

	"use strict";

	g.assert(type);
	g.assert(whenCalled);
	g.assert(type.prototype, "Object prototype may only be an Object or null");

	var ProxyInfo = require("./proxy-info");
	var ProxyInstance = require("./proxy-instance");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxies.ProxyPrototype";

	var getArguments = function(args) {
		return Array.prototype.slice.call(args);
	};

	var initializeShadow = function(thisContext) {
		thisContext.__scarlet__ = {};
		thisContext.__scarlet__.__proxy__ = new ProxyInstance(thisContext, whenCalled);
		thisContext.__scarlet__.__proxy__.wrap();
	};

	var buildProceed = function(thisContext, callArguments, resultCallback) {
		return function() {
			var callArguments = getArguments(arguments);
			var result = type.apply(thisContext, callArguments);
			if (typeof(result) != "undefined")
				resultCallback(result);
			initializeShadow(thisContext);
			return result;
		};
	};

	var invokeWhenCalled = function(thisContext, proxyInfo, callArguments, resultCallback) {
		var args = callArguments;
		var proceed = buildProceed(thisContext, callArguments, resultCallback);
		proxyInfo.setIsPrototype(true);
		whenCalled.call(
			thisContext,
			proxyInfo,
			proceed,
			args);
	};

	var inheritor = function() {
		var methodResult = null;
		var thisContext = this || {};
		var proxyInfo = new ProxyInfo(type);
		proxyInfo.__isConstructor__ = true;
		var callArguments = getArguments(arguments);
		invokeWhenCalled(
			thisContext,
			proxyInfo,
			callArguments,
			function(result) {
				methodResult = result;
			});
		return methodResult;
	};

	self.wrap = function(replaceClassCallback) {
		g.ext.logger.info(ProxyPrototype, "wrap", "Wrapping Prototype", [self]);
		g.util.inherits(inheritor, type);
		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function() {
		return self;
	};
}

module.exports = ProxyPrototype;

},{"../../include":1,"./proxy-info":10,"./proxy-instance":11}],16:[function(require,module,exports){
var g = require("../../include");

function ProxyType() {

	"use strict";

	var self = this;

	self.UNDEFINED = -1;
	self.INSTANCE = 0;
	self.METHOD = 1;
	self.PROPERTY = 2;
	self.PROTOTYPE = 3;
	self.FUNCTION = 4;

	self.value = self.UNDEFINED;
	self.__typename__ = "scarlet.lib.proxies.ProxyType";

	self.is = function(otherProxyType) {
		return self.value === otherProxyType.value;
	};

	self.asUndefined = function() {
		var newType = new ProxyType();
		newType.value = self.UNDEFINED;
		return newType;
	};

	self.asInstance = function() {
		var newType = new ProxyType();
		newType.value = self.INSTANCE;
		return newType;
	};

	self.asMethod = function() {
		var newType = new ProxyType();
		newType.value = self.METHOD;
		return newType;
	};

	self.asFunction = function() {
		var newType = new ProxyType();
		newType.value = self.FUNCTION;
		return newType;
	};

	self.asProperty = function() {
		var newType = new ProxyType();
		newType.value = self.PROPERTY;
		return newType;
	};

	self.asPrototype = function() {
		var newType = new ProxyType();
		newType.value = self.PROTOTYPE;
		return newType;
	};

	//g.ext.logger.info(ProxyType, ProxyType, "For Proxy Type", [self]);
}

module.exports = ProxyType;

},{"../../include":1}],17:[function(require,module,exports){
var g = require("../include");

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

	var ProxyType = require("./proxies/proxy-type");
	var Interceptor = require("./interceptors/interceptor");
	var PluginManager = require("./plugins/plugin-manager");

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
		g.assert(typeOrInstance, "Please make sure you supply a typeOrInstance parameter. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());");
		g.assert(proxyType, "Please make sure you supply a type. eg. scarlet.intercept(MyFunc, scarlet.type.asInstance());")
		g.ext.logger.info(Scarlet, "intercept", "For Type Or Instance", [typeOrInstance]);
		interceptor = new Interceptor()
		interceptor.observable = typeOrInstance;
		interceptor.intercept(typeOrInstance, function(observable) {
			interceptor.observable = observable;
		}, proxyType);
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
		g.assert(callback);
		g.assert(interceptor);
		g.ext.logger.info(Scarlet, "using", "Using Interceptor", [callback]);
		interceptor.using(function(info, method, args){
			var thisContext = this;
			self.emit("before", {
				info: info,
				args: args,
				result: null,
				method: method,
				self: thisContext
			});
			var result = null;
			try {
				result = callback.call(this, info, method, args);
				self.emit("after", {
					info: info,
					args: args,
					result: result,
					method: method,
					self: thisContext
				});
			} catch(err){
				self.emit("error", {
					info: info,
					args: args,
					result: result,
					method: method,
					self: thisContext,
					error: err
				});
			}
			self.emit("done", {
				info: info,
				args: args,
				result: result,
				method: method,
				self: thisContext
			});
			return result;

		});
		return self;
	};

	/**
		Method for retrieving a reference to a proxy type, this is for types that need to be instantiated using 'new'
		@method proxy
		@return {Object}
	*/
	self.proxy = function() {
		g.assert(interceptor);
		g.assert(interceptor.observable);
		g.ext.logger.info(Scarlet, "proxy", "As Proxied Type Or Instance", [interceptor.observable]);
		return interceptor.observable;
	};

	/**
		Method for loading a plugin into scarlet
		@param {String} pluginPath
		@method load
		@return {scarlet.lib.Scarlet}
	*/
	self.load = function(pluginPath) {
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

	g.events.EventEmitter.call(self);
}

g.util.inherits(Scarlet, g.events.EventEmitter);

module.exports = Scarlet;
},{"../include":1,"./interceptors/interceptor":7,"./plugins/plugin-manager":8,"./proxies/proxy-type":16}],18:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
         self.operator + ' ' +
         truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b),
        key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function(err) { if (err) {throw err;}};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

},{"util/":20}],19:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],20:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"./support/isBuffer":19,"__browserify_process":23,"inherits":22}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        throw TypeError('Uncaught, unspecified "error" event.');
      }
      return false;
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],22:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],23:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],24:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"__browserify_process":23}],25:[function(require,module,exports){
module.exports=require(19)
},{}],26:[function(require,module,exports){
module.exports=require(20)
},{"./support/isBuffer":25,"__browserify_process":23,"inherits":22}]},{},[2])
(2)
});