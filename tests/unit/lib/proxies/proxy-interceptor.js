var assert = require("assert");

describe("Given /lib/proxies/ProxyInterceptor", function() {

	var ProxyType = require("../../../../lib/proxies/proxy-type");
	var ProxyInterceptor = require("../../../../lib/proxies/proxy-interceptor");
	var enumerable = require("../../../../lib/extensions/enumerable");
	describe("When #ctor() with a normal function", function() {

		var type = new ProxyType().asPrototype();

		function AnyFunction(anyParameter) {
			return anyParameter;
		}

		var methodCalls = [];
		var interceptor = new ProxyInterceptor(AnyFunction);

		interceptor
			.intercept(
				function(proceed,args,info) {
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
			assert(result == "anyValue");
			assert(methodCalls.length == 1);
			assert(methodCalls[0].args[0] == "anyValue");

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
				function(proceed,args,info) {
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
			assert(methodCalls.length > 0);
			assert(result == "anyParameterValue");

			var anyMethodCall = enumerable.first(methodCalls, function(element) {
				return element.info.memberName == "anyMethod";
			});

			assert(anyMethodCall.args.length > 0);
			assert(anyMethodCall.instance == instance);
			assert(anyMethodCall.result == "anyParameterValue");
			assert(anyMethodCall.args[0] == "anyParameterValue");
		});

		it("Then should be able to observe properties", function() {

			var instance = new AnyClass();
			instance.anyProperty = "foo";
			var result = instance.anyProperty;

			assert(result == "foo");
			assert(methodCalls.length == 3);

			var anyPropertySetCall = methodCalls[1];

			assert(anyPropertySetCall.instance == instance);
			assert(anyPropertySetCall.info.memberName == "anyProperty");

			var anyPropertyGetCall = methodCalls[2];

			assert(anyPropertyGetCall.instance == instance);
			assert(anyPropertyGetCall.info.memberName == "anyProperty");

		});

	});

});