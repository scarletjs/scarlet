var sinon = require("sinon");
var assert = require("assert");
var typeBuilder = require("./types/type-builder");
var eventBuilder = require("./events/event-builder");
var enumerable = require("../../lib/extensions/enumerable");
var interceptorBuilder = require("./interceptors/interceptor-builder");

var MethodAssertionBuilder = require("./method-assertion-builder");
var PropertyAssertionBuilder = require("./property-assertion-builder");
var ErrorMethodAssertionBuilder = require("./error-method-assertion-builder");

ScarletBuilder.prototype = Object.create(typeBuilder.prototype);
ScarletBuilder.prototype = Object.create(eventBuilder.prototype);
ScarletBuilder.prototype = Object.create(interceptorBuilder.prototype);

function ScarletBuilder(scarlet){
	typeBuilder.call(this,scarlet);
	eventBuilder.call(this,scarlet);
	interceptorBuilder.call(this,scarlet);
	
	var self = this;
	self.scarlet = scarlet;

	self.forInstance = function(instance){
		self.scarlet.intercept(instance);
		withEachInterceptor(instance,function(interceptor){
			self.scarlet.using(interceptor);
		});
		instance = self.scarlet.proxy();
		return {
			forMethod : function(method){
				return new MethodAssertionBuilder(method)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
			},
			forProperty : function(instance,propertyName){
				return new PropertyAssertionBuilder(instance,propertyName)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
			},
			forErrorMethod : function(errorMethod){
				return new ErrorMethodAssertionBuilder(errorMethod)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
			}
		};
	};
	
	self.forProperty = function(instance,propertyName){
		self.scarlet.intercept(instance,propertyName);
		withEachInterceptor(instance,function(interceptor){
				self.scarlet.using(interceptor);
			});
		instance = self.scarlet.proxy();
		return new PropertyAssertionBuilder(instance,propertyName)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
	};

	self.forMethod = function(method){
		self.scarlet.intercept(method);
		withEachInterceptor(method,function(interceptor){
			self.scarlet.using(interceptor);
		});
		method = self.scarlet.proxy();
		return new MethodAssertionBuilder(method)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
	};
	
	self.forErrorMethod = function(errorMethod){
		self.scarlet.intercept(errorMethod);
		withEachInterceptor(errorMethod,function(interceptor){
			self.scarlet.using(interceptor);
		});
		errorMethod = self.scarlet.proxy();
		return new ErrorMethodAssertionBuilder(errorMethod)
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
	};

	self.forMethodByName = function(instance,methodName){
		self.scarlet.intercept(instance,methodName);
		withEachInterceptor(instance,function(interceptor){
			self.scarlet.using(interceptor);
		});
		instance = self.scarlet.proxy();
		return new MethodAssertionBuilder(instance[methodName])
											.withInterceptors(self.interceptors)
											.withEvents(self.events);
	};

	var withEachInterceptor = function(instance, onEach){
		assert(self.interceptors.length > 0,"Interceptors must be defined before specifying type");

		var spies = {};
		enumerable.forEach(instance,function(member,memberName){
			if(instance[memberName].spy)
				return;

			if(typeof instance[memberName] === "function")
				spies[memberName] = sinon.spy(instance,memberName);
		});

		enumerable.forEach(self.interceptors,function(interceptor){	
			onEach(interceptor);
		});
		
		enumerable.forEach(spies,function(member,memberName){
			instance[memberName].spy = spies[memberName];
		});
	};

	var forEachInstanceType = function(onEach){
		for (var i = 0; i < self.instances.length; i++) {
			var instance = self.instances[i];
			onEach(instance);
		}
	};

	self.assert = function(){
		forEachInstanceType(function(instance){
			describe("When instance is:"+instance.name,function(){
				describe("when intercepting an instance",function(){
					describe("when calling a method with return",function(){
						instance = instance.reset();
						self.forInstance(instance)
							.forMethod(instance.methodWithReturn)
							.withExpectedResult("any")
							.assert();
					});
					describe("when calling a method that throws an error",function(){
						instance = instance.reset();
						self.forInstance(instance)
							.forErrorMethod(instance.errorMethod)
							.assert();
					});
					describe("when accessing a property",function(){
						instance = instance.reset();
						self.forInstance(instance)
							.forProperty(instance,"property")
							.withExpectedResult("any")
							.assert();
					});
				});
				describe("when intercepting by member name",function(){
					describe("When member is a property", function() {
						instance = instance.reset();
						self.forProperty(instance,"property")
							.withExpectedResult("any")
							.assert();
					});
					describe("When member is a method", function() {
						instance = instance.reset();
						self.forMethodByName(instance,"methodWithReturn")
							.withExpectedResult("any")
							.assert();
					});
				});
				describe("When intercepting a method", function() {
						instance = instance.reset();
						self.forMethod(instance.methodWithReturn)
							.withExpectedResult("any")
							.assert();
				});
				describe("when intercepting a method that throws an error",function(){
					instance = instance.reset();
					self.forInstance(instance)
						.forErrorMethod(instance.errorMethod)
						.assert();
				});
			});
		});
	};
}

ScarletBuilder.for = function(scarlet){
	return new ScarletBuilder(scarlet);
};

module.exports = ScarletBuilder;