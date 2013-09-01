var path = require("path");
var assert = require("assert");

function Plugins() {
	
	"use strict";

	var self = this;
	
	self.loadPlugin = function($scarlet, pluginPath) {

		assert($scarlet, "Scarlet::Plugins::loadPlugin::$scarlet == null");
		assert(pluginPath, "Scarlet::Plugins::loadPlugin::pluginPath == null");

		var fullPath = path.normalize(__dirname + "/../../" + pluginPath);
		var ScarletPlugin = require(fullPath);

		var pluginObject = new ScarletPlugin($scarlet);
		pluginObject.initialize();

	};

}

module.exports = new Plugins();