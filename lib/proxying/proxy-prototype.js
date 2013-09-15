var g = require("../../include");

function ProxyPrototype(type, whenCalled){

	"use strict";

	g.assert(type, "Cannot have null instance");
	g.assert(whenCalled, "Cannot have null whenCalled callback");
	g.assert(type.prototype, "Cannot only inherit from prototype objects");

	var ProxyInstance = require("./proxy-instance");

	var self = this;

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