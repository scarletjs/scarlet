module.exports = function(){

	var self = this;
	self.property = "any";
	self.name = "UnnamedFunction";
	self.__type__ = "scarlet.tests.spec.builders.dummies.UnnamedFunction";

	self.method = function(){
	};
	
	self.methodWithReturn = function(){
		return "any";
	};

	self.errorMethod = function(){
		throw new Error("Any Error");
	};
};