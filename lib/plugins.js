var path = require("path");
var assert = require("assert");

function Plugins() {

	var self = this;
	
	self.loadPlugin = function($scarlet, pluginPath) {

		assert($scarlet, "Scarlet::Plugins::loadPlugin::$scarlet == null");
		assert(pluginPath, "Scarlet::Plugins::loadPlugin::pluginPath == null");

		fullPath = path.normalize(__dirname + "/../../" + pluginPath);
		var plugin = require(fullPath);

		pluginObject = new plugin($scarlet);
		pluginObject.initialize();

	};

}

module.exports = new Plugins();