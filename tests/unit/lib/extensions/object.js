var assert = require("assert");

describe("Given lib/extensions/Object", function(){

	var ext = require("../../../../lib/extensions");

	describe("When #has(obj, prop)", function(){

		function NamedFunction(){
			this.anyProperty = "any";
			this.anyMethod = function(){};
		}

		var UnamedFunction = function(){
			this.anyProperty = "any";
			this.anyMethod = function(){};
		};

		var ObjectLiteral = {
			anyProperty: "any",
			anyMethod: function(){}
		};

		function PrototypeFunction(){}
		PrototypeFunction.prototype.anyProperty = "any";
		PrototypeFunction.prototype.anyMethod = function(){};

		it("Then should find 'anyProperty' on a named function", function(){
			var hasPropertyOnType = ext.object.has(new NamedFunction(), "anyProperty");
			assert(hasPropertyOnType);
		});

	});

	describe("When #isNull()", function(){

		it("Then should return true for null reference", function(){
			assert(ext.object.isNull(null));
		});

		it("Then should return true for undefined", function(){
			assert(ext.object.isNull(undefined));
		});

		it("Then should return false for non null reference", function(){
			assert(!ext.object.isNull(function(){}));
		});

	});

});