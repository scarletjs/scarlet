var g = require("../../../../include");

describe("Given /lib/proxies/ProxyInterceptor", function() {

	var ProxyType = require("../../../../lib/proxies/proxy-type");
	var ProxyInterceptor = require("../../../../lib/proxies/proxy-interceptor");

	describe("When #ctor() with a normal function", function() {

		var type = new ProxyType().asPrototype();

		function AnyFunction(anyParameter) {
			return anyParameter;
		}

		var methodCalls = [];
		var interceptor = new ProxyInterceptor(AnyFunction);

		interceptor
			.intercept(
				function(info, proceed, args) {
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
				},
				function(observableType) {
					AnyFunction = observableType;
				}, type);

		beforeEach(function() {
			methodCalls = [];
		});

		it("Then should be able to observe a method call", function(){

			var result = AnyFunction("anyValue");

			g.assert(result == "anyValue");
			g.assert(methodCalls.length == 1);
			g.assert(methodCalls[0].args[0] == "anyValue");

		});

	});

	describe("When #ctor() with named function", function() {

		var type = new ProxyType().asPrototype();
		
		function AnyClass() {
			var self = this;
			self.methodCalled = false;
			self.anyProperty = "anyValue";
			self.anyMethod = function(anyParameter) {
				self.methodCalled = true;
				return anyParameter;
			};
		}

		var methodCalls = [];
		var interceptor = new ProxyInterceptor(AnyClass);

		interceptor
			.intercept(
				function(info, proceed, args) {
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
				},
				function(observableType) {
					AnyClass = observableType;
				}, type);

		beforeEach(function() {
			methodCalls = [];
		});

		it("Then should be able to observe methods", function() {

			var instance = new AnyClass();
			var result = instance.anyMethod("anyParameterValue");

			g.assert(methodCalls.length > 0);
			g.assert(result == "anyParameterValue");

			var anyMethodCall = g.ext.enumerable.first(methodCalls, function(element) {
				return element.info.memberName == "anyMethod";
			});

			g.assert(anyMethodCall.args.length > 0);
			g.assert(anyMethodCall.instance == instance);
			g.assert(anyMethodCall.result == "anyParameterValue");
			g.assert(anyMethodCall.args[0] == "anyParameterValue");
		});

		it("Then should be able to observe properties", function() {

			var instance = new AnyClass();
			instance.anyProperty = "foo";
			var result = instance.anyProperty;

			g.assert(result == "foo");
			g.assert(methodCalls.length == 3);

			var anyPropertySetCall = methodCalls[1];

			g.assert(anyPropertySetCall.instance == instance);
			g.assert(anyPropertySetCall.info.memberName == "anyProperty");

			var anyPropertyGetCall = methodCalls[2];

			g.assert(anyPropertyGetCall.instance == instance);
			g.assert(anyPropertyGetCall.info.memberName == "anyProperty");

		});

	});

});