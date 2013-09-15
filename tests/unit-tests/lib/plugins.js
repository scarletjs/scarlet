var g = require("../../../include");

module.exports = function($scarlet){

	var self = this;
	self.initializeWasCalled = false;

	self.initialize = function(){
		self.initializeWasCalled = true;
	};

};

describe("Given /lib/Plugins", function(){

	var Scarlet = require("../../../lib/scarlet");
	var Plugins = require("../../../lib/plugins");
	var pluginManager = new Plugins();

	describe("When #loadPlugin()", function(){

		var $scarlet = new Scarlet();
		pluginManager.setPluginPath(__dirname + "/");

		it("Then should load and call initialize", function(){
			var plugin = pluginManager.loadPlugin($scarlet, "plugins");
			g.assert(plugin.initializeWasCalled);
		});

	});

});