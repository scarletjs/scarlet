module.exports = function(){

	var self = this;
	self.property = "any";
	self.methodCalled = false;
	self.methodWithReturnCalled = false;
	self.__type__ = "scarlet.tests.spec.builders.dummies.NamedFunction";

	self.method = function(){
		self.methodCalled = true;
	};
	
	self.methodWithReturn = function(){
		self.methodWithReturnCalled = true;
		return "any";
	};

	self.reset = function(){
		self.methodCalled = false;
		self.methodWithReturnCalled = false;
	};
};