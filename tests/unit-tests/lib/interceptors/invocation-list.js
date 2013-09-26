var g = require("../../../../include");

describe("Given /lib/interceptors/InvocationList", function(){

	var InvocationList = require("../../../../lib/interceptors/invocation-list");

	describe("When #addInvocation", function(){

		it("Then it should register a 'previous' callback", function(){

			var thisContext = {};

			var target = function(arg1, arg2, arg3) {
				return arg1 + " " + arg2 + " " + arg3;
			};

			var invocationList = new InvocationList(thisContext, target);

			var interceptor1Called = false;
			var interceptor1 = function(){
				interceptor1Called = true;
			};

			invocationList.addInvocation(interceptor1);

			var interceptor2Called = false;
			var interceptor2 = function(){
				interceptor2Called = true;
			};

			invocationList.addInvocation(interceptor2);

			var result = invocationList.invoke("can", "like", "apple");

			g.assert(result, "can like apple");

		});

	});

});