var g = require("../../include");

function PluginManager() {
	
	"use strict";

	var self = this;
	self.directoryPath = __dirname + "/../../";

	self.setDirectory = function(directoryPath){
		self.directoryPath = directoryPath;
	};
	
	self.load = function($scarlet, pluginDirectoryPath) {
		g.assert($scarlet);
		var fullPath = g.path.normalize(self.directoryPath + pluginDirectoryPath);
		var ScarletPlugin = require(fullPath);
		var pluginObject = new ScarletPlugin($scarlet);
		pluginObject.initialize();
		return pluginObject;
	};

}

module.exports = PluginManager;