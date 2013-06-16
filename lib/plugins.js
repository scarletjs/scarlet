var l = console.log;
var i = require("util").inspect;

var path = require("path");
var assert = require("assert");

function Plugins() {

	var self = this;
	
	self.pluginDir = __dirname + "/plugins/";

	self.loadPlugin = function($scarlet, name) {

		assert($scarlet, "Scarlet::Plugins::loadPlugin::$scarlet == null");
		assert(name, "Scarlet::Plugins::loadPlugin::name == null");

		var fullPath = path.join(self.pluginDir, name);
		fullPath = path.normalize(fullPath);

		var plugin = require(fullPath);
		pluginObject = new plugin($scarlet);
		pluginObject.initialize();

	};

}

module.exports = new Plugins();