var sinon = require('sinon');
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

	self.forMethodWithReturn = function(){
		this.typeAssertionBuilder.forMethodWithReturn();
		this.eventAssertionBuilder.forMethodWithReturn();
		this.interceptorAssertionBuilder.forMethodWithReturn();
		addMemberProxy('methodWithReturn');
		return self;
	};

	self.forProperty = function(){
		this.typeAssertionBuilder.forProperty();
		this.eventAssertionBuilder.forProperty();
		this.interceptorAssertionBuilder.forProperty();
		addMemberNameProxy('property');
		return self;
	};

	self.forMethodWithReturnByName = function(){
		this.typeAssertionBuilder.forMethodWithReturn();
		this.eventAssertionBuilder.forMethodWithReturn();
		this.interceptorAssertionBuilder.forMethodWithReturn();
		addMemberNameProxy('methodWithReturn');
		return self;	
	};

	self.forInstance = function(){
		this.typeAssertionBuilder.forInstance();
		this.eventAssertionBuilder.forInstance();
		this.interceptorAssertionBuilder.forInstance();
		forEachInterceptorAndInstance(function(instance,interceptor){
			self.scarlet
				.intercept(instance)
				.using(interceptor)
				.proxy();
		});
		return self;
	};

	var forEachInterceptorAndInstance = function(onEach){
		enumerable.forEach(self.instances, function(instance) {
			var spies = {};
			enumerable.forEach(instance,function(member,memberName){
				if(typeof instance[memberName] === 'function')
					spies[memberName] = sinon.spy(instance,memberName);
			});

			enumerable.forEach(self.interceptors,function(interceptor){
				onEach(instance,interceptor);
			});

			enumerable.forEach(spies,function(member,memberName){
				instance[memberName].spy = spies[memberName];
			});
		});
	};

	var addMemberNameProxy = function(memberName){
		forEachInterceptorAndInstance(function(instance,interceptor){
			self.scarlet
				.intercept(instance,memberName)
				.using(interceptor)
				.proxy();
		});
	};

	var addMemberProxy = function(member){
		forEachInterceptorAndInstance(function(instance,interceptor){
			instance[member] =
				self.scarlet
					.intercept(instance[member])
					.using(interceptor)
					.proxy();
		});
	};

	self.assert = function(){
		this.typeAssertionBuilder.assert(function(instance){
			self.eventAssertionBuilder.assert(instance);
			self.interceptorAssertionBuilder.assert(instance);
		});
	};
};

ScarletBuilder.for = function(scarlet){
	return new ScarletBuilder(scarlet);
};

module.exports = ScarletBuilder;