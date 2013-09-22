var g = require("../../../../include");

describe("Given /lib/proxying/ProxyInterceptor", function() {

	var ProxyInterceptor = require("../../../../lib/proxying/proxy-interceptor");

	describe("When #ctor() with named function", function() {

		function AnyClass(){
			var self = this;
			self.methodCalled = false;
			self.anyProperty = "anyValue";
			self.anyMethod = function(anyParameter){
				self.methodCalled = true;
				return anyParameter;
			};
		}

		var methodCalls = [];
		var interceptor = new ProxyInterceptor(AnyClass);

		var whenCalled = function(info, proceed, args) {
			var methodResult = proceed.apply(this, args);
			var result = {
				info: info,
				method: proceed,
				args: args,
				result: methodResult,
				instance: this
			};
			methodCalls.push(result);
			return methodResult;
		};

		var replaceType = function(observableType) {
			AnyClass = observableType;
		};

		interceptor
			.intercept(
				whenCalled,
				replaceType);

		beforeEach(function(){
			methodCalls = [];
		});

		it("Then should be able to observe methods", function() {
			
			var instance = new AnyClass();
			var result = instance.anyMethod("anyParameterValue");

			g.assert(methodCalls.length > 0);
			g.assert(result == "anyParameterValue");

			var anyMethodCall = g.ext.enumerable.first(methodCalls, function(element){
				return element.info.memberName == "anyMethod";
			});

			g.assert(anyMethodCall.args.length > 0);
			g.assert(anyMethodCall.instance == instance);
			g.assert(anyMethodCall.result == "anyParameterValue");
			g.assert(anyMethodCall.args[0] == "anyParameterValue");
		});

		it("Then should be able ot observe properties", function(){

			var instance = new AnyClass();
			instance.anyProperty = "foo";
			var result = instance.anyProperty;

			g.assert(result == "foo");
			g.assert(methodCalls.length == 2);

			var anyPropertySetCall = methodCalls[0];

			g.assert(anyPropertySetCall.instance == instance);
			g.assert(anyPropertySetCall.info.memberName == "anyProperty");

			var anyPropertyGetCall = methodCalls[1];

			g.assert(anyPropertyGetCall.instance == instance);
			g.assert(anyPropertyGetCall.info.memberName == "anyProperty");

		});

	});

});