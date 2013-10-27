var g = require("../../../../include");

describe("Given /lib/interceptors/Interceptor", function(){

	var Interceptor = require("../../../../lib/interceptors/interceptor");

	describe("When using multiple interceptors", function(){

		it("Then I should have a fully working call cycle", function(){

			var thisContext = {};

			var target = function(arg1, arg2, arg3) {
				g.ll(arg1);
				g.ll(arg2);
				g.ll(arg3);
				return arg1 + " " + arg2 + " " + arg3;
			};

			var interceptor = new Interceptor();

			var interceptor1Args = null;
			var interceptor1Called = false;
			var interceptor1 = function(info, method, args){
				g.ll("Interceptor 1");
				g.ll(args);
				interceptor1Called = true;
				interceptor1Args = args;
				return method.call(this, info, method, ["blinky", "pinkey", "dinkey"]);
			};

			var interceptor2Args = null;
			var interceptor2Called = false;
			var interceptor2 = function(info, method, args){
				g.ll("Interceptor 2");
				g.ll(args);
				interceptor2Called = true;
				interceptor2Args = args;
				return method.call(this, info, method, ["phoebie", "fubu", "fanzie"]);
			};

			var interceptor3Args = null
			var interceptor3Called = false;
			var interceptor3 = function(info, method, args){
				g.ll("Interceptor 3");
				g.ll(args);
				interceptor3Called = true;
				interceptor3Args = args;
				return method.call(this, info, method, ["mickey", "mikey", "joe"]);
			};

			var replace = function(observable){
				target = observable;
			};

			interceptor
				.intercept(target, replace)
				.using(interceptor1)
				.using(interceptor2)
				.using(interceptor3);

			var result = target("apple", "bananna", "pear");

			g.assert(interceptor1Called);
			g.assert(interceptor2Called);
			g.assert(interceptor3Called);
			g.assert(result == "blinky pinkey dinkey");

		});

	});

})