var assert = require("assert");

function PrototypeFunction(){
	var self = this;
	self.property = "any";
	self.name = "PrototypeFunction";
	self.__type__ = "scarlet.tests.spec.builders.dummies.PrototypeFunction";
}

PrototypeFunction.prototype.property = "any";

PrototypeFunction.prototype.method = function(){
};

PrototypeFunction.prototype.methodUsingInstanceProperty = function(){
	return this.property;
};

PrototypeFunction.prototype.methodWithReturn = function(){
	return "any";
};

PrototypeFunction.prototype.errorMethod = function(){
	throw new Error("Any Error");
};

module.exports = PrototypeFunction;