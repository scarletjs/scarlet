var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");
var enumerable = require("./enumerable");
var interceptor = require("./interceptor");

function Scarlet() {

	var self = this;

	self.intercept = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		return new interceptor(typeOrInstance);
	};

}

module.exports = new Scarlet();