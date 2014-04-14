var assert = require("assert");

var ScarletTrace = function(proceed, info) {
	"use strict";

	assert(info, "info=null");
	assert(proceed, "proceed=null");

	var self = this;
	self.args = info.args;
	self.result = info.result;
	self.memberName = info.memberName;
	self.hasResult = typeof(info.result) !== "undefined";
	self.hasArgs = typeof(info.args) !== "undefined";
	self.argsEmpty = info.args !== null && typeof(info.args) !== "undefined" && info.args.length === 0;

	self.traceTo = function(io) {
		var formattedResult = (!self.hasResult) ? "void" : info.result;
		var formattedName = (!info.memberName) ? "" : info.memberName;
		var formattedArgs = ((!self.hasArgs) || (self.argsEmpty)) ? "" : JSON.stringify(info.args);
		io(formattedName + "(" + formattedArgs + "):" + formattedResult);
	};
};

module.exports = ScarletTrace;