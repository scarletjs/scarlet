require("../include");

function Plugins() {
	
	"use strict";

	var self = this;
	
	self.loadPlugin = function($scarlet, pluginPath) {
		assert($scarlet, "$scarlet == null");
		assert(pluginPath, "pluginPath == null");
		var fullPath = path.normalize(__dirname + "/../../" + pluginPath);
		var ScarletPlugin = require(fullPath);
		var pluginObject = new ScarletPlugin($scarlet);
		pluginObject.initialize();
	};

}

module.exports = new Plugins();