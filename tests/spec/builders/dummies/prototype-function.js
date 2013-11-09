var assert = require("assert");

function PrototypeFunction(){
	var self = this;
	self.property = "any";
	self.methodCalled = false;
	self.methodWithReturnCalled = false;
	self.__type__ = "scarlet.tests.spec.builders.dummies.PrototypeFunction";
}

PrototypeFunction.prototype.property = "any";
PrototypeFunction.prototype.methodCalled = false;
PrototypeFunction.prototype.methodWithReturnCalled = false;

PrototypeFunction.prototype.method = function(){
	this.methodCalled = true;
};

PrototypeFunction.prototype.methodUsingInstanceProperty = function(){
	return this.property;
};

PrototypeFunction.prototype.methodWithReturn = function(){
	this.methodWithReturnCalled = true;
	return "any";
};

PrototypeFunction.prototype.reset = function(){
	this.methodCalled = false;
	this.methodWithReturnCalled = false;
};

module.exports = PrototypeFunction;