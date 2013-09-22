var g = require("../../include");

function ProxyPrototype(type, whenCalled){

	"use strict";

	g.assert(type);
	g.assert(whenCalled);
	g.assert(type.prototype);

	var ProxyInfo = require("./proxy-info");
	var ProxyInstance = require("./proxy-instance");

	var self = this;
	self.whenCalled = whenCalled;
	self.__typename__ = "scarlet.lib.proxying.ProxyPrototype";

	var initializeShadow = function(thisContext) {
		thisContext.__scarlet__ = {};
		thisContext.__scarlet__.__proxy__ = new ProxyInstance(thisContext, whenCalled);
		thisContext.__scarlet__.__proxy__.wrap();
	};

	var buildProceed = function(thisContext, callArguments, resultCallback){
		return function(){
			var result = type.apply(thisContext, callArguments);
			if (typeof(result) != "undefined")
				resultCallback(result);
			initializeShadow(thisContext);
			return result;
		};
	};

	var invokeWhenCalled = function(thisContext, proxyInfo, callArguments, resultCallback){
		var args = callArguments;
		var proceed = buildProceed(thisContext, callArguments, resultCallback);
		whenCalled.call(
			thisContext, 
			proxyInfo, 
			proceed, 
			args);
	};

	var inheritor = function(){
		var methodResult = null;
		var thisContext = this || {};
		var proxyInfo = new ProxyInfo(type);
		var callArguments = Array.prototype.slice.call(arguments);
		
		invokeWhenCalled(
			thisContext, 
			proxyInfo, 
			callArguments, 
			function(result){
				methodResult = result;
			});

		return methodResult;
	};

	self.wrap = function(replaceClassCallback){
		g.util.inherits(inheritor, type);
		if (replaceClassCallback)
			replaceClassCallback(inheritor);
		return self;
	};

	self.unwrap = function(){
		return self;
	};
}

module.exports = ProxyPrototype;