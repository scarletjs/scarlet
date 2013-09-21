var g = require("../../include");

function ProxyPrototype(type, whenCalled){

	"use strict";

	g.assert(type);
	g.assert(whenCalled);
	g.assert(type.prototype);

	var ProxyInstance = require("./proxy-instance");

	var self = this;
	self.__typename__ = "scarlet.lib.proxying.ProxyPrototype";

	self.wrap = function(replaceClassCallback){
		var inheritor = function(){
			var self = this;
			var args = Array.prototype.slice.call(arguments);
			type.apply(self, args);
			new ProxyInstance(self, whenCalled).wrap();
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