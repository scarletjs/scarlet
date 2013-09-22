var l = console.log;
var util = require("util");
var ll = function(val) {
	l(util.inspect(val));
}

/*
require("../../../vendor/harmony-reflect/reflect");
require("../../../vendor/harmony-reflect/handlers");

ll(Relflect);

return;
*/

describe("Given", function() {

	describe("When", function() {

		it("Then", function() {

			function NamedFunction() {
				var self = this;
				self.anyProperty = "any";
				self.anyMethod = function() {}
			}

			var UnamedFunction = function() {
				this.anyProperty = "any";
				this.anyMethod = function() {}
			};

			var ObjectLiteral = {
				anyProperty: "any",
				anyMethod: function() {}
			};

			function PrototypeFunction() {}
			PrototypeFunction.prototype.anyProperty = "any";
			PrototypeFunction.prototype.anyMethod = function() {}

			/*Reflect.Proxy(NamedFunction, function(){
				ll("Proxy handler called");
			});*/

			var oldCreate = Object.create;
			Object.create = function(){
				ll("Inside object create override");
				oldCreate(arguments);
			};

			var instance = new NamedFunction();

			/*ll("Ping!");
			for(var thing in UnamedFunction){
				ll("Looping");
				ll(thing);
			}*/

			var instance = new NamedFunction();
			instance.anyMethod(1,2,3);


		});

	});

});