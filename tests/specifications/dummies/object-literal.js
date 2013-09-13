module.exports = {
	
	self: this,
	property: "any",
	methodCalled: false,
	methodWithReturnCalled: false,

	method: function(){
		self.methodCalled = true;
	},
	
	methodWithReturn: function(){
		self.methodWithReturnCalled = true;
		return "any";
	}, 

	reset: function(){
		self.methodCalled = false;
		self.methodWithReturnCalled = false;
	}

}