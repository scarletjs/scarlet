var g = require("../include");

function ProxyMember(instance, member, memberName) {

	"use strict";

	var object = require("./extensions/object");
	var enumerable = require("./extensions/enumerable");

	var self = this;
	self.info = new ProxyInfo(instance, memberName);
	
	var canProxyMemberName = function(memberName){
		var result = true;
		var excludedMembers = [
			"__scarlet", 
			"__typeName"
		];
		enumerable.forEach(function(excludedMemberName){
			if (memberName === excludedMemberName)
				result = false;
		});
		return result;
	};

	self.whenCalled = function(target) {
		instance.__scarlet[memberName] = instance[memberName];
		if (info.isMethod)
			createFunctionProxy(instance[memberName], memberName, target);
		else if (info.isProperty)
			createPropertyProxy(instance[memberName], memberName, target);
		return instance;
	};

	var createPropertyProxy = function(member, memberName, target) {
		g.ll("::::::::::::::::::::::::::::: INTERCEPTING PROPERTY :::::::::::::::::::::::::-> " + memberName);
		if (instance.hasOwnProperty(memberName) && !(member instanceof Function) && (canProxyMember(memberName))) {
			instance = Object.defineProperty(instance, memberName, {
				configurable: true,
				get: function() {
					return target(instance, function() {
						return instance.__scarlet[memberName];
					}, instance.__scarlet[memberName], memberName);
				},
				set: function(value) {
					g.ll(" **** ->>>> *** ->>>" + memberName);
					target(instance, function() {
						instance.__scarlet[memberName] = value;
					}, value, memberName);
				}
			});
		} 
	};

	var createFunctionProxy = function(member, memberName, target) {
		g.ll("::::::::::::::::::::::::::::: INTERCEPTING FUNCTION :::::::::::::::::::::::::-> " + memberName);
		if (member instanceof Function && canProxyMember(memberName)) {
			var originalMethod = instance.__scarlet[memberName];
			instance[memberName] = function() {
				return target(instance, instance.__scarlet[memberName], arguments, memberName);
			};
			instance[memberName].toString = function(){ return originalMethod.toString();};
		}
	};

	self.unwrap = function() {
		if (instance.__scarlet) {
			enumerable.forEach(instance, function(member, memberName) {
				if (member instanceof Function) {
					var originalMethod = instance.__scarlet[memberName];
					instance[memberName] = originalMethod;
				} else {
					var originalValue = instance.__scarlet[memberName];
					delete instance[memberName];
					instance[memberName] = originalValue;
				}
			});
		}
	};

	return self;
}

module.exports = ProxyMember;