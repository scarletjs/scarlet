var g = require("../../../../include");

describe("Given /lib/proxying/ProxyInterceptor", function() {

	var ProxyInterceptor = require("../../../../lib/proxying/proxy-interceptor");

	describe("When #ctor() with named function", function() {

		function AnyClass(){
			var self = this;
			self.methodCalled = false;
			self.anyProperty = "anyValue";
			self.anyMethod = function(anyParameter){
				g.ll(" *** AnyClass::anyMethod(anyParameter='" + anyParameter + "') <--- *** ");
				self.methodCalled = true;
				return anyParameter;
			};
			g.ll(" *** AnyClass::ctor() <--- *** ");
		}

		var observedArguments = null;
		var observedProxyInfo = null;
		var observedMethodCall = null;
		var whenCalledExecuted = false;
		var interceptor = new ProxyInterceptor(AnyClass);

		var whenCalled = function(info, proceed, args) {
			g.ll(" *** WhenCalled:: ---> *** ");
			g.ll(info);
			g.ll(proceed);
			g.ll(args);
			observedArguments = args;
			observedProxyInfo = info;
			observedMethodCall = proceed;
			whenCalledExecuted = true;
			return proceed();
		};

		var replaceType = function(observableType) {
			AnyClass = observableType;
		};

		g.ll(" *** Before interceptor.intercept(whenCalled, replaceTypeCallback)");
		interceptor
			.intercept(
				whenCalled,
				replaceType);
		g.ll(" *** After interceptor.intercept(whenCalled, replaceTypeCallback)");

		it("Then should be able to observe methods", function() {
			
			g.ll(" *** Before new AynClass()");
			var instance = new AnyClass();
			g.ll(" *** After new AynClass()");
			var result = instance.anyMethod("anyParameterValue");

			g.ll(observedArguments);

			g.assert(whenCalledExecuted);
			g.assert(observedArguments);
			g.assert(observedProxyInfo);

			g.assert(observedArguments.length == 1);
		});

	});

});