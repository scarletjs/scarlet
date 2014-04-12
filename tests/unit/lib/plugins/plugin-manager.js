var assert = require("assert");

module.exports = function($scarlet){

	var self = this;
	self.initializeWasCalled = false;

	self.initialize = function(){
		self.initializeWasCalled = true;
	};

};

describe("Given /lib/Plugins", function(){

	var Scarlet = require("../../../../lib/scarlet");
	var PluginManager = require("../../../../lib/plugins/plugin-manager");
	var pluginManager = new PluginManager();

	describe("When #loadPlugin()", function(){

		var $scarlet = new Scarlet();
		pluginManager.setDirectory(__dirname + "/");

		it("Then should load and call initialize", function(){
			var plugin = pluginManager.load($scarlet, "plugin-manager");
			assert(plugin.initializeWasCalled);
		});

	});

});