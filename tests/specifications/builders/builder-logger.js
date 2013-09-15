var g = require("../../../include");
var dummies = require("./dummies");
var ext = require("../../../lib/extensions");

function BuilderLogger(){

	var self = this;
	self.DEBUG = 4;
	self.INFO = 3;
	self.WARN = 2;
	self.ERROR = 1;
	self.logLevel = 4;

	self.print = function(obj, func, msg) {
		if (!ext.object.isNull(obj) && ext.object.isNull(func))
			g.ll(ext.object.getName(obj));
		if (!ext.object.isNull(obj) && !ext.object.isNull(func))
			g.ll(ext.object.getName(obj) + "::" + ext.object.getName(func) + "(" + ext.object.getParameterNames(func).join(",") + ")");
		g.ll(msg);
		if(!ext.object.isNull(obj))
			g.ll(obj);
	};

	self.debug = function(obj, func, msg){
		if (self.logLevel == self.DEBUG)
			self.print(obj, func, msg);
	};

	self.info = function(obj, func, msg) {
		if (self.logLevel >= self.INFO)
			self.print(obj, func, msg);
	};

	self.warn = function(obj, func, msg){
		if (self.logLevel >= self.WARN)
			self.print(obj, func, msg);
	};

	self.error = function(obj, func, msg){
		if (self.logLevel >= self.ERROR)
			self.print(obj, func, msg);
	};
	
}

module.exports = BuilderLogger;
