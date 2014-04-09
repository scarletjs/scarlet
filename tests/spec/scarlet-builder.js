var sinon = require("sinon");
var assert = require("assert");
var typeBuilder = require("./types/type-builder");
var eventBuilder = require("./events/event-builder");
var enumerable = require("../../lib/extensions/enumerable");
var interceptorBuilder = require("./interceptors/interceptor-builder");

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
		withEachInterceptor(instance,function(interceptor){
			instance = self.scarlet
							.intercept(instance)
							.using(interceptor)
							.proxy();
		});

		return {
			forMethod : methodBuilder,
			forProperty : propertyBuilder
		};
	};
	
	self.forProperty = function(instance,propertyName){
		withEachInterceptor(instance,function(interceptor){
			 instance = self.scarlet
				.intercept(instance,propertyName)
				.using(interceptor)
				.proxy();
			});
		return propertyBuilder(instance,propertyName);
	};

	self.forMethod = function(method){
		withEachInterceptor(method,function(interceptor){
			 method = self.scarlet
				.intercept(method)
				.using(interceptor)
				.proxy();
			});
		return methodBuilder(method);
	};
	
	self.forMethodByName = function(instance,methodName){
		withEachInterceptor(instance,function(interceptor){
			 instance = self.scarlet
				.intercept(instance,methodName)
				.using(interceptor)
				.proxy();
			});
		return methodBuilder(instance[methodName]);
	};

	var propertyBuilder = function(instance,property){
		self.typeAssertionBuilder.forProperty();
		self.eventAssertionBuilder.forProperty();
		self.interceptorAssertionBuilder.forProperty();
		
		return {
			withExpectedResult : function(result){
				this.result = result;
				return this;
			},
			assert : function(){
				self.typeAssertionBuilder.assert(instance, this.result, property, function(instance,result,property){
					self.interceptorAssertionBuilder.assert(instance,result,property);
					self.eventAssertionBuilder.assert(instance,result,property);
				});
			}
		};
	};

	var methodBuilder = function(method){
		self.typeAssertionBuilder.forMethod();
		self.interceptorAssertionBuilder.forMethod();
		self.eventAssertionBuilder.forMethod();

		return {
			withParameters : function(parameters){
				this.parameters = parameters;
				return this;
			},
			withExpectedResult : function(result){
				this.result = result;
				return this;
			},
			assert : function(){
				self.typeAssertionBuilder.assert(method, this.result, this.parameters,function(method,result,parameters){
					self.interceptorAssertionBuilder.assert(method,result,parameters);
					self.eventAssertionBuilder.assert(method,result,parameters);
				});
			}
		};
	};

	var withEachInterceptor = function(instance, onEach){
		assert(self.interceptors.length > 0,"Interceptors must be defined before specifying type");

		var spies = {};
		enumerable.forEach(instance,function(member,memberName){
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
};

ScarletBuilder.for = function(scarlet){
	return new ScarletBuilder(scarlet);
};

module.exports = ScarletBuilder;