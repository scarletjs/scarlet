function NamedFunction(){
	var self = this;
	self.property = "any";
	self.name = "NamedFunction";
	self.__type__ = "scarlet.tests.spec.builders.dummies.NamedFunction";

	self.method = function(){
	};
	
	self.methodWithReturn = function(){
		return "any";
	};

	self.errorMethod = function(){
		throw new Error("Any Error");
	};
}

module.exports = NamedFunction;