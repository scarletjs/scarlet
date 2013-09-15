function NamedFunction(){
	
	var self = this;
	self.property = "any";
	self.methodCalled = false;
	self.methodWithReturnCalled = false;

	self.method = function(){
		self.methodCalled = true;
	};
	
	self.methodWithReturn = function(){
		console.log("->>> NAMED-FUNC ->>> METHOD WITH RET START");
		self.methodWithReturnCalled = true;
		console.log("->>> NAMED-FUNC ->>> METHOD WITH RET FINISHED");
		return "any";
	};

	self.reset = function(){
		self.methodCalled = false;
		self.methodWithReturnCalled = false;
	};


};

module.exports = NamedFunction;