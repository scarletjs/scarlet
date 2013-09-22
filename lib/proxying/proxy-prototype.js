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

	self.wrap = function(replaceClassCallback){
		var inheritor = function(){
			var methodResult = null;
			var thisContext = this || {};
			var info = new ProxyInfo(type);
			var args = Array.prototype.slice.call(arguments);
			whenCalled.call(
				thisContext, info, 
				function(){
					methodResult = type.apply(thisContext, args);
					self.__scarlet__ = {};
					self.__scarlet__.__proxy__ = new ProxyInstance(thisContext, whenCalled);
					self.__scarlet__.__proxy__.wrap();
					return methodResult;
				}, 
				args);
			return methodResult;
		}
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