var g = require("../../../../include");

describe("Given lib/extensions/Object", function(){

	var ext = require("../../../../lib/extensions");

	describe("When #getParameterNames()", function(){

		it("Then it should be able to discover the paramters", function(){
			var interceptor = function(proceed, invocation, done) {};
			var results = ext.object.getParameterNames(interceptor);
			g.assert(results[0] == "proceed");
			g.assert(results[1] == "invocation");
			g.assert(results[2] == "done");
		});

	});

	describe("When #getParams()", function(){

		it("Then should find params for a vanilla function", function(){
			function any(param1, param2, param3) {}
			var params = ext.object.getParameterNames(any);
			g.assert(params[0] == "param1", "First parameter is not equal to 'param1'");
			g.assert(params[1] == "param2", "Second parameter is not equal to 'param2'");
			g.assert(params[2] == "param3", "Third parameter is not equal to 'param3'");
		});

	});

	describe("When #has(obj, prop)", function(){

		function NamedFunction(){
			this.anyProperty = "any";
			this.anyMethod = function(){}
		}

		var UnamedFunction = function(){
			this.anyProperty = "any";
			this.anyMethod = function(){}
		};

		var ObjectLiteral = {
			anyProperty: "any",
			anyMethod: function(){}
		};

		function PrototypeFunction(){}
		PrototypeFunction.prototype.anyProperty = "any";
		PrototypeFunction.prototype.anyMethod = function(){}

		it("Then should find 'anyProperty' on a named function", function(){
			var hasPropertyOnType = ext.object.has(new NamedFunction(), "anyProperty");
			g.assert(hasPropertyOnType);
		});

	});

	describe("When #isNull()", function(){

		var nullObj = null;
		var undefObj = undefined;

		it("Then should return true for null reference", function(){
			g.assert(ext.object.isNull(nullObj));
		});

		it("Then should return true for undefined", function(){
			g.assert(ext.object.isNull(undefObj));
		});

		it("Then should return false for non null reference", function(){
			g.assert(!ext.object.isNull(new function(){}));
		});

	});

	describe("When #hasMember() for classes", function(){

		var anyClass = function(){
			var self = this;
			self.anyProperty = "Foo";
			self.anyMethod = function(){};
		};

		it("Then it should be able to find a method", function(){
			g.assert(ext.object.hasMember(anyClass, "anyMethod"));
		});

		it("Then it should be able to find a property", function(){
			g.assert(ext.object.hasMember(anyClass, "anyProperty"));
		});

	});

	describe("When #hasMember() for instances", function(){

		var anyClass = function(){
			var self = this;
			self.anyProperty = "Foo";
			self.anyMethod = function(){};
		};

		var anyInstance = new anyClass();

		it("Then it should be able to find a method", function(){
			g.assert(ext.object.hasMember(anyInstance, "anyMethod"));
		});

		it("Then it should be able to find a property", function(){
			g.assert(ext.object.hasMember(anyInstance, "anyProperty"));
		});

	});

	describe("When #hasProperty() for classes", function(){

		var anyClass = function(){
			var self = this;
			self.anyProperty = "foo";
			self.anyMethod = function(){};
		};

		it("Then it should recognise 'anyProperty' as a valid property", function(){
			g.assert(ext.object.hasProperty(anyClass, "anyProperty"));
		});

		it("Then it should recognise 'anyMethod' as an invalid property", function(){
			g.assert(ext.object.hasProperty(anyClass, "anyMethod") == false);
		});

	});

});