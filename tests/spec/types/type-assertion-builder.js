var propertyGet = require('./assertions/propertyGetAssertions');
var propertySet = require('./assertions/propertySetAssertions');
var methodWithReturn = require('./assertions/methodWithReturnAssertions');

module.exports = function TypeAssertionBuilder(){
	var self = this;

	this.types = [];
	this.assertions = [];

	var addAssertion = function(assertion){
		self.assertions.push(assertion);
	};

	this.forMethodWithReturn = function(){
		addAssertion(function(type){
			methodWithReturn(type);
		});
	};
	this.forPropertyGet = function(){
		addAssertion(function(type){
			propertyGet(type);
		});
	};
	this.forPropertySet = function(){
		addAssertion(function(type){
			propertySet(type);
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

	this.withType = function(type){
		this.types.push(type);
	};

	this.assert = function(next){
		
		for (var i = 0; i < this.types.length; i++) {
			var type = this.types[i];
			describe("When type is:"+type.name,function(){
				for (var i = 0; i < self.assertions.length; i++) {
					self.assertions[i](type);
				};

				if(next)
					next(type);
			});
		};
	};
};