require("../include");

var Dispatcher = require("../lib/dispatcher");

describe("Given we are using a dispatcher", function(){

	describe("When #isAsynchronous()", function(){

		it("Then should return 'true' if interceptor has 'done' parameter", function(){
			var dispatcher = new Dispatcher();
			var interceptor = function(proceed, invocation, done){};
			assert(dispatcher.isAsynchronous(interceptor));
		});

		it("Then should return 'false' if the interceptor does not have 'done' parameter", function(){
			var dispatcher = new Dispatcher();
			var interceptor = function(proceed, invocation){};
			assert(!dispatcher.isAsynchronous(interceptor));
		});

	});

	describe("When #getChainedCalls", function(){

		var firstCall = function(proceed, invocation, done){
			ll("first call");
		};
		var secondCall = function(proceed, invocation, done){
			ll("second call");
		};
		var thirdCall = function(proceeed, invocation, done){
			ll("third call");
		};

		var dispatcher = new Dispatcher();
		dispatcher.subscribeCall(firstCall);
		dispatcher.subscribeCall(secondCall);
		dispatcher.subscribeCall(thirdCall);

		var callChain = dispatcher.getCallChain();

		it("Then build the call chain correctly", function(){
			assert(callChain != null);
			assert(callChain.method == firstCall);
			assert(callChain.next().method == secondCall);
			assert(callChain.next().next().method == thirdCall)
		});

	});

	describe("When #subscribeCall()", function(){

		it("Then should enlist callback into array", function(){
			var dispatcher = new Dispatcher();
			var callback = function(proceed, invocation) {};
			dispatcher.subscribeCall(callback);
			assert(dispatcher.methodCalls.length == 1);
		});

		it("Then should be able to override the context of 'this'", function(){
			
			var resultThisContext = null;
			var dispatcher = new Dispatcher();
			var thisContext = new function(){};

			var callback = function(proceed, invocation) {
				resultThisContext = this;
			};

			var invocation = {
				object: new function() { this.name = "anyObject" },
				proceed: function(){}
			};

			dispatcher.subscribeCall(callback, thisContext);
			dispatcher.dispatch(invocation);

			assert(resultThisContext === thisContext);
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
			assert(firstInvocation === invocation);
			assert(secondInvocation === invocation);
		});

	});

});