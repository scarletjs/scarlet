var util = require("util");
var inspect = util.inspect;
var assert = require("assert");
var object = require("./object");
var ll = function(val) {
	self.log(inspect(val));
};

function Logger() {

	"use strict";

	var self = this;
	self.DEBUG = 4;
	self.INFO = 3;
	self.WARN = 2;
	self.ERROR = 1;
	self.NONE = 0;
	self.logLevel = self.NONE;

	self.log = console.log;

	var getFunctionName = function(func) {

		if (typeof(func) == "string")
			return func;

		var ret = func.toString();
		ret = ret.substr("function ".length);
		ret = ret.substr(0, ret.indexOf("("));

		if (ret === "" || ret === null || typeof(ret) === "undefined")
			ret = "function<anonymous>";

		return ret;
	};

	var getParamNames = function(func) {

		var ret = "";

		if (typeof(func) === "string") {
			ret += func;
		} else if (typeof(func) !== "string") {
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
	};

	self.print = function(type, obj, func, msg, args) {

		if (args === null)
			args = "";
		else
			args = "\n" + inspect(args).replace(/\n/g, "\n");

		if (typeof(msg) == "object" || typeof(msg) == "function")
			msg = inspect(msg, {
				depth: 10,
				showHidden: true
			});

		if (typeof(func) == "string" && !object.isNull(obj) && !object.isNull(obj[func])) {
			var funcName = func;
			var actualFunc = obj[func];
			self.log(type + getFunctionName(obj) + "::" + funcName + "(" + getParamNames(actualFunc).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!object.isNull(obj) && object.isNull(func)) {
			self.log(type + getFunctionName(func) + "(" + getParamNames(obj).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (object.isNull(obj) && !object.isNull(func)) {
			self.log(type + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
			return;
		}

		if (!object.isNull(obj) && !object.isNull(func)) {
			self.log(type + getFunctionName(obj) + "::" + getFunctionName(func) + "(" + getParamNames(func).join(",") + ") - " + msg + args + "\n");
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