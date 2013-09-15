function NamedFunction(){
	
	var self = this;
	self.property = "any";
	self.methodCalled = false;
	self.methodWithReturnCalled = false;

	self.method = function(){
		self.methodCalled = true;
	};
	
	self.methodWithReturn = function(){
		console.log("Method with return called");
		self.methodWithReturnCalled = true;
		return "any";
	};

	self.reset = function(){
		self.methodCalled = false;
		self.methodWithReturnCalled = false;
	};


};

module.exports = NamedFunction;