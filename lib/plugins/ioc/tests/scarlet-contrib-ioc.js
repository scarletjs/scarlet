var l = console.log;
var i = require("util").inspect;

var util = require("util");
var assert = require("assert");

var $scarlet = require("../../../scarlet");

describe("Given we are using scarlet with IoC", function(){

	beforeEach(function(){

	});

	function AnyDependency(){
		var self= this;
		self.method = function(){
		};
	}

	function AnyObject(anyDependency) {
		var self= this;
		self.method = function(){
			assert(anyDependency, "AnyObject::anyDependency == null");
			anyDependency.method();
		};
	}

	$scarlet.plugins.ioc.register("anyDependency", AnyDependency);
	$scarlet.plugins.ioc.register("anyObject", AnyObject);

	describe("When resolving a dependency", function(){

		var anyObject = $scarlet.plugins.ioc.resolveForKey("anyObject");

		l(i(anyObject));

		it("Then should be able to resolve it through the container", function(){

			anyObject.method();

		});

	});

});