module.exports = {
	
	property: "any",
	methodCalled: false,
	methodWithReturnCalled: false,

	method: function(){
		methodCalled = true;
	},
	
	methodWithReturn: function(){
		methodWithReturnCalled = true;
		return "any";
	}, 

	reset: function(){
		methodCalled = false;
		methodWithReturnCalled = false;
	}

}