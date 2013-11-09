var g = require("../../include");
var builder = require("./builders");
var Scarlet = require("../../lib/scarlet");

describe("Given we are using scarlet", function() {

	var scarlet = new Scarlet();

	describe("When invoking all kinds of instances", function() {

		var assertThat = 
			builder
				.for(scarlet)
				.withInstances()
				.withInterceptor()
				.invokeAll()
				.assert();

		it("Then we should be able to verify all methods were invoked", function() {
			assertThat.allInvoked();
		});

	});

	/*describe("When intercepting Math.min", function(){

		it("Should call out to the interceptor", function(done){

			var interceptorCalled = false;
			
			g.ll(Math.min);

			Math.min = scarlet.intercept(Math.min)
			    .using(function(info, method, args){ 
			        console.log("Interceptor Called -> ");
			        console.log("Info:");
			        console.log(info);
			        console.log("Args:");
			        console.log(args);
			        var result = method.call(this, info, method, args);
			        console.log("Result:");
			        console.log(result);
			        interceptorCalled = true;
			        done();
			        return result;
			    }).proxy();
			        
			g.ll(Math.min);

			Math.min(1,2,3);

			g.assert(interceptorCalled, "The interceptor was not called for Math.min");

		});

	});*/

});