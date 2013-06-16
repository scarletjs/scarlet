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
		self.result = self.method(args);
		return self.result;
	};
}

module.exports = Invocation;