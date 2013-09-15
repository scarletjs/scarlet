var g = require("../../include");

function ProxyInfo(instance, memberName){

	"use strict";

	var self = this;
	self.instance = instance;
	self.memberName = memberName;
	self.isProperty = !g.ext.object.isFunction(instance[memberName]);
	self.isMethod = g.ext.object.isFunction(instance[memberName]);

	self.isAllowed = function(){
		return memberName != "__scarlet";
	};

	self.enureShadow = function(){
		if (!g.ext.object.hasProperty(self.instance, "__scarlet"))
			self.instance.__scarlet = {};
		return self;
	};

	self.enureShadow();
}

module.exports = ProxyInfo;