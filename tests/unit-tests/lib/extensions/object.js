require("../../../../include");

describe("Given lib/extensions/Object", function(){

	var ext = require("../../../../lib/extensions");

	describe("When #getParameterNames()", function(){

		it("Then it should be able to discover the paramters", function(){
			var interceptor = function(proceed, invocation, done) {};
			var results = ext.object.getParameterNames(interceptor);
			assert(results[0] == "proceed");
			assert(results[1] == "invocation");
			assert(results[2] == "done");
		});

	});

	describe("When #isNull()", function(){

		var nullObj = null;
		var undefObj = undefined;

		it("Then should return true for null reference", function(){
			assert(ext.object.isNull(nullObj));
		});

		it("Then should return true for undefined", function(){
			assert(ext.object.isNull(undefObj));
		});

		it("Then should return false for non null reference", function(){
			assert(!ext.object.isNull(new function(){}));
		});

	});

	describe("When #hasMember() for classes", function(){

		var anyClass = function(){
			var self = this;
			self.anyProperty = "Foo";
			self.anyMethod = function(){};
		};

		it("Then it should be able to find a method", function(){
			assert(ext.object.hasMember(anyClass, "anyMethod"));
		});

		it("Then it should be able to find a property", function(){
			assert(ext.object.hasMember(anyClass, "anyProperty"));
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
			assert(ext.object.hasMember(anyInstance, "anyMethod"));
		});

		it("Then it should be able to find a property", function(){
			assert(ext.object.hasMember(anyInstance, "anyProperty"));
		});

	});

	describe("When #hasProperty() for classes", function(){

		var anyClass = function(){
			var self = this;
			self.anyProperty = "foo";
			self.anyMethod = function(){};
		};

		it("Then it should recognise 'anyProperty' as a valid property", function(){
			assert(ext.object.hasProperty(anyClass, "anyProperty"));
		});

		it("Then it should recognise 'anyMethod' as an invalid property", function(){
			assert(ext.object.hasProperty(anyClass, "anyMethod") == false);
		});

	});

});