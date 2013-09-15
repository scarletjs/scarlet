var g = require("../include");
var ext = require("./extensions");

function Plugins() {
	
	"use strict";

	var self = this;
	self.pluginPath = __dirname + "/../../";

	self.setPluginPath = function(folderPath){
		self.pluginPath = folderPath;
	};
	
	self.loadPlugin = function($scarlet, pluginFolder) {
		assert($scarlet, "$scarlet == null");
		assert(self.pluginPath, "pluginPath == null");
		var fullPath = path.normalize(self.pluginPath + pluginFolder);
		var ScarletPlugin = require(fullPath);
		var pluginObject = new ScarletPlugin($scarlet);
		pluginObject.initialize();
		return pluginObject;
	};

}

module.exports = new Plugins();