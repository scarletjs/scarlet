var assert = require("assert");
var inspect = require("util").inspect;
var ll = function(val) { console.log(inspect(val)); };

describe("Given /lib/interceptors/Interceptor", function(){

	var Interceptor = require("../../../../lib/interceptors/interceptor");

	describe("When using multiple interceptors", function(){

		it("Then I should have a fully working call cycle", function(){

			var thisContext = {};

			var target = function(arg1, arg2, arg3) {
				return arg1 + " " + arg2 + " " + arg3;
			};

			var interceptor = new Interceptor();

			var interceptor1Args = null;
			var interceptor1Called = false;
			var interceptor1 = function(info,proceed){
				interceptor1Called = true;
				interceptor1Args = info.args;
				info.args = ["blinky", "pinkey", "dinkey"];
				return proceed();
			};

			var interceptor2Args = null;
			var interceptor2Called = false;
			var interceptor2 = function(info,proceed){
				interceptor2Called = true;
				interceptor2Args = info.args;
				info.args = ["phoebie", "fubu", "fanzie"];
				return proceed();
			};

			var interceptor3Args = null;
			var interceptor3Called = false;
			var interceptor3 = function(info,proceed){
				interceptor3Called = true;
				interceptor3Args = info.args;
				info.args = ["mickey", "mikey", "joe"];
				return proceed();
			};

			var replace = function(observable){
				target = observable;
			};

			interceptor
				.intercept(target, null, replace)
				.using(interceptor1)
				.using(interceptor2)
				.using(interceptor3);

			var result = target("apple", "bananna", "pear");

			assert(interceptor1Called);
			assert(interceptor2Called);
			assert(interceptor3Called);
			assert(result === "mickey mikey joe");

		});

	});

});