function Logger() {

	"use strict";

	var g = {};

	g.util = require("util");
	g.assert = require("assert");
	g.object = require("./object");

	g.log = console.log;
	g.print = g.util.print;
	g.inspect = g.util.inspect;

	g.l = g.log;
	g.i = g.inspect;
	g.ll = function(val) { g.l(g.i(val)); } 

	var self = this;
	self.DEBUG = 4;
	self.INFO = 3;
	self.WARN = 2;
	self.ERROR = 1;
	self.logLevel = self.WARN;

	var getFunctionName = function(func) {
		
		if (typeof(func) == "string")
			return func;
		
		var ret = func.toString();
		ret = ret.substr('function '.length);
		ret = ret.substr(0, ret.indexOf('('));
		
		if (ret === "" || ret == null || typeof(ret) == "undefined")
			ret = "function<anonymous>";
		
		return ret;
	};

	var getParamNames = function(func) {

		var ret = ""

		if (typeof(func) == "string") {
			ret += func;
		} else if (typeof(func) != "string") {
			ret = func.toString();
		}

		if (ret == "[object Object]")
			ret += "";

		var firstBracketIndex = ret.indexOf("(");
		var lastBracketIndex = ret.indexOf(")");

		if (firstBracketIndex === -1 || lastBracketIndex === -1)
			return [];

		ret = ret.slice(ret.indexOf("(") + 1, ret.indexOf(")"));
		return ret.split(",");
	}

	self.print = function(type, obj, func, msg, args) {

		if (args == null)
			args = "";
		else
			args = "\n" + g.i(args).replace(/\n/g, "\n");

		if (typeof(msg) == "object" || typeof(msg) == "function")
			msg = g.i(msg, {
				depth: 10,
				showHidden: true
			});

		if (typeof(func) == "string" && !g.object.isNull(obj) && !g.object.isNull(obj[func])) {
			var funcName = func;
			var actualFunc = obj[func];
			g.l(type + getFunctionName(obj) + "::" + funcName + "(" + getParamNames(actualFunc).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!g.object.isNull(obj) && g.object.isNull(func)) {
			g.l(type + getFunctionName(func) + "(" + getParamNames(obj).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (g.object.isNull(obj) && !g.object.isNull(func)) {
			g.l(type + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!g.object.isNull(obj) && !g.object.isNull(func)) {
			g.l(type + getFunctionName(obj) + "::" + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
			return;
		}
	};

	self.debug = function(obj, func, msg, args) {
		if (self.logLevel == self.DEBUG)
			self.print("DEBUG @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.info = function(obj, func, msg, args) {
		if (self.logLevel >= self.INFO)
			self.print("INFO  @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.warn = function(obj, func, msg, args) {
		if (self.logLevel >= self.WARN)
			self.print("WARN  @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

	self.error = function(obj, func, msg, args) {
		if (self.logLevel >= self.ERROR)
			self.print("ERROR @ [" + new Date().toString() + "] -> ", obj, func, msg, args);
	};

}

module.exports = new Logger();