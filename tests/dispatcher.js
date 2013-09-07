require("../include");

var Dispatcher = require("../lib/dispatcher");

describe("Given we are using a dispatcher", function(){

	describe("When #subscribeCall()", function(){

		var dispatcher = new Dispatcher();

		var callback = function(proceed, invocation) {};

		it("Then should enlist callback into array", function(){
			dispatcher.subscribeCall(callback);
			assert(dispatcher.methodCalls.length == 1);
		});

	});

	describe("When #dispose()", function(){

		var dispatcher = new Dispatcher();
		
		var callback = function(proceed, invocation) {};

		it("Then should clear all callbacks", function(){
			dispatcher.subscribeCall(callback);
			dispatcher.dispose();
			assert(dispatcher.methodCalls.length == 0);
		});

	});

	describe("When #dispatch()", function(){

		var dispatcher = new Dispatcher();
		
		var firstInvocation = null;
		var firstThisContext = null;
		var firstMethodCalled = false;
		
		var firstCallback = function(proceed, invocation){
			firstThisContext = this;
			firstMethodCalled = true;
			firstInvocation = invocation;
		};

		dispatcher.subscribeCall(firstCallback);

		var secondInvocation = null;
		var secondThisContext = null;
		var secondMethodCalled = false;

		var secondCallback = function(proceed, invocation){
			secondThisContext = this;
			secondMethodCalled = true;
			secondInvocation = invocation;
		};

		dispatcher.subscribeCall(secondCallback);

		var invocation = {
			object: new function() { this.name = "anyObject" },
			proceed: function(){}
		};

		dispatcher.dispatch(invocation);

		it("Then should call all callbacks", function(){
			assert(firstMethodCalled);
			assert(secondMethodCalled);
		});

		it("Then should use invocation.object as context for this", function(){
			assert(firstThisContext === invocation.object);
			assert(secondThisContext === invocation.object);
		});

		it("Then should use the same invocation object instance", function(){
			ll(firstInvocation);
			assert(firstInvocation === invocation);
			assert(secondInvocation === invocation);
		});

	});

});