var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");
var enumerable = require("./enumerable");
var interceptor = require("./interceptor");

l(i(interceptor));

function Scarlet() {

	'use strict';

	var self = this;

	require("string-format");
	self.S = require("string");

	self.interceptType = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		var _interceptor = new interceptor(typeOrInstance);
		return new _interceptor.asType();
	};

	self.interceptObject = function(typeOrInstance) {
		assert(typeOrInstance, "Cannot have null type or instance");
		var _interceptor = new interceptor(typeOrInstance);
		return _interceptor.asObject();
	};

}

module.exports = new Scarlet();