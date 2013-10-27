var state = new function() {
		this.methodCalled = false;
		this.methodWithReturnCalled = false;
	};

var objectLiteral = {

	property: "any",
	__type__: "spec.builders.dummies.ObjectLiteral",

	get methodCalled() {
		return state.methodCalled;
	},

	get methodWithReturnCalled() {
		return state.methodWithReturnCalled;
	},

	method: function() {
		state.methodCalled = true;
	},

	methodWithReturn: function() {
		state.methodWithReturnCalled = true;
		return "any";
	},

	reset: function() {
		state.methodCalled = false;
		state.methodWithReturnCalled = false;
	}
};

module.exports = objectLiteral;