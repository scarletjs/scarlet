var g = require("../../include");

function ProxyInfo(instance, memberName){

	"use strict";

	var self = this;
	self.instance = instance;
	self.memberName = memberName;
	self.isMethod = g.ext.object.isFunction(instance[memberName]);
	self.isProperty = !g.ext.object.isFunction(instance[memberName]);
	//self.isPrototype = g.ext.object.hasProperty(instance.prototype, memberName);

	self.isAllowed = function(){
		return memberName != "__scarlet";
	};

	self.ensureShadow = function(){
		if (!g.ext.object.hasProperty(self.instance, "__scarlet"))
			self.instance.__scarlet = {};
		return self;
	};

	self.ensureShadow();
}

module.exports = ProxyInfo;