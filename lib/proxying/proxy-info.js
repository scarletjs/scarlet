var g = require("../../include");

function ProxyInfo(instance, memberName){

	"use strict";

	var self = this;
	self.instance = instance;
	self.memberName = memberName;

	self.isAllowed = function(){
		return memberName != "__scarlet";
	};

	self.ensureShadow = function(){
		if (!g.ext.object.hasProperty(self.instance, "__scarlet"))
			self.instance.__scarlet = {};
		return self;
	};

	self.isMethod = function(){
		return !g.ext.object.isNull(self.instance)
			&& !g.ext.object.isNull(self.memberName)
			&& !g.ext.object.isNull(self.instance[memberName]) 
			&& g.ext.object.isFunction(self.instance[self.memberName]);
	};

	self.isFunction = function(){
		return g.ext.object.isNull(memberName)
			&& g.ext.object.isFunction(instance);
	};

	self.isProperty = function(){
		return !g.ext.object.isFunction(self.instance[self.memberName]);
	};

	self.isInstance = function(){
		return g.ext.object.isNull(memberName)
			&& self.instance instanceof(Object);
	};

	self.isPrototype = function(){
		return g.ext.object.isNull(memberName)
			&& g.ext.object.isFunction(self.instance)
			&& !g.ext.object.isNull(self.instance.prototype);
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;