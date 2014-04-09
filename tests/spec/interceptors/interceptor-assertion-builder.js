var callbackInterceptorMethodWithReturnAssertions = require("./assertions/callbackInterceptorMethodWithReturnAssertions");
var callbackInterceptorPropertyGetAssertions = require("./assertions/callbackInterceptorPropertyGetAssertions");
var callbackInterceptorPropertySetAssertions = require("./assertions/callbackInterceptorPropertySetAssertions");

module.exports = function InterceptorAssertionBuilder(){
	var self = this;
	this.assertions = [];
	this.interceptors = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};

	this.forMethodWithReturn = function(){
		addAssertion(function(interceptor,instance){
			callbackInterceptorMethodWithReturnAssertions(interceptor,instance);				
		});
	};
	this.forPropertyGet = function(){
		addAssertion(function(interceptor,instance){
			callbackInterceptorPropertyGetAssertions(interceptor,instance);
		});
	};
	this.forPropertySet = function(){
		addAssertion(function(interceptor,instance){
			callbackInterceptorPropertySetAssertions(interceptor,instance);
		});
	};
	this.forProperty = function(){
		this.forPropertyGet();
		this.forPropertySet();
	};
	this.forInstance = function(){
		this.forProperty();
		this.forMethodWithReturn();
	};
	this.withInterceptor = function(interceptor){
		this.interceptors.push(interceptor);
	};

	this.assert = function(instance,next){
		for (var i = 0; i < this.interceptors.length; i++) {
			var interceptor = this.interceptors[i];
			describe("when using:"+interceptor.name,function(){
				for (var i = 0; i < self.assertions.length; i++) {
					self.assertions[i](interceptor,instance);
				};

				if(next)
					next(instance);
			});
		};
	};
};