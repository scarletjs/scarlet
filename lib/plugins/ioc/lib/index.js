var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");

function RegisteryEntry(key, component){
	var self = this;
}

function Component(){
	var self = this;
}

function Container($scarlet){
	var self = this;

	self.components = [];

	self.initialize = function(){
		$scarlet.plugins.ioc = self;
		l("initialize");
	};

	self.register = function(keyName, type) {
		var component = new Component(keyName, type);
		self.components.push(component);
	};

	self.resolveForKey = function(keyName){

	};
	
	self.resolveForType = function(keyName){

	};
}

module.exports = Container;