var assert = require("assert");

var ScarletTrace = function(proceed, info){
	"use strict";

	assert(info, "info=null");
	assert(proceed, "proceed=null");

	var self = this;
	self.args = info.args;
	self.result = info.result;
	self.memberName = info.memberName;
	self.isConstructor = info.proxyInfo.type.isConstructor;
	self.isPropertyGetter = info.proxyInfo.type.isPropertyGetter;
	self.isPropertySetter = info.proxyInfo.type.isPropertySetter;
	self.isMethod = info.proxyInfo.type.isMethod;
	self.isFunction = info.proxyInfo.type.isFunction;
	self.hasResult = typeof(info.result) !== "undefined";
	self.hasArgs = typeof(info.args) !== "undefined";
	self.argsEmpty = info.args !== null && typeof(info.args) !== "undefined" && info.args.length === 0;

	self.traceTo = function(io) {
		var formattedResult =
			(self.isConstructor) ? typeof(this) 
					: (self.isPropertySetter) ? info.args[1]
						: (!self.hasResult) ? "void"
							: info.result;
		var formattedName =
			(self.isConstructor) ? "ctor"
				: (self.isPropertySetter) ? "set " + info.memberName
					: (self.isPropertyGetter) ? "get " + info.memberName
						: info.memberName;
		var formattedArgs =
			(self.isPropertySetter) ? info.args[0]
				: (self.isPropertyGetter) ? ""
					: (!self.hasArgs) ? ""
						: (self.argsEmpty) ? ""
							: JSON.stringify(info.args);
		io(formattedName+"("+formattedArgs+"):"+formattedResult);
	};
};

module.exports = ScarletTrace;