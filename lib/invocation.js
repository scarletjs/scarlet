var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");

function Invocation(object, method, args) {

	assert(object, "Scarlet::Invocation::object == null");
	assert(method, "Scarlet::Invocation::method == null");
	assert(args, "Scarlet::Invocation::args == null");

	var self = this;

	self.args = args;
	self.object = object;
	self.method = method;
	self.result = null;

	self.proceed = function() {
		var paramaters = Array.prototype.slice.call(args);
		self.result = self.method.apply(self.object,paramaters);
		return self.result;
	};
}

module.exports = Invocation;