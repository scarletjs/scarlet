var g = require("../../include");

function ProxyInfo(instanceOrType, memberName){

	"use strict";

	g.assert(instanceOrType);

	var self = this;
	self.memberName = memberName;
	self.instanceOrType = instanceOrType;

	self.isAllowed = function(){
		return memberName != "__scarlet";
	};

	self.ensureShadow = function(){
		if (!g.ext.object.hasProperty(self.instanceOrType, "__scarlet"))
			self.instanceOrType.__scarlet = {};
		return self;
	};

	self.isMethod = function(){
		return !g.ext.object.isNull(self.instanceOrType)
			&& !g.ext.object.isNull(self.memberName)
			&& !g.ext.object.isNull(self.instanceOrType[memberName]) 
			&& g.ext.object.isFunction(self.instanceOrType[self.memberName]);
	};

	self.isFunction = function(){
		return g.ext.object.isNull(memberName)
			&& g.ext.object.isFunction(self.instanceOrType);
	};

	self.isProperty = function(){
		return !g.ext.object.isFunction(self.instanceOrType[self.memberName]);
	};

	self.isInstance = function(){
		return g.ext.object.isNull(memberName)
			&& self.instanceOrType instanceof(Object);
	};

	self.isPrototype = function(){
		return g.ext.object.isNull(memberName)
			&& g.ext.object.isFunction(self.instanceOrType)
			&& !g.ext.object.isNull(self.instanceOrType.prototype);
	};

	g.ll("Before ensureShadow()");
	self.ensureShadow();
	g.ll("After ensureShadow()");
}

module.exports = ProxyInfo;