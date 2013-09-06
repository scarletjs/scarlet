require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are using scarlet events", function() {

	var interceptorCalled = false;

	function interceptor(proceed, invocation) {
		var result = proceed();
		interceptorCalled = true;
		return result;
	};

	describe("When using interceptor events", function() {

		var doneEventCalled = false;
		var afterEventCalled = false;
		var beforeEventCalled = false;

		beforeEach(function() {
			doneEventCalled = false;
			afterEventCalled = false;
			beforeEventCalled = false;
		});

		describe("When using beforeEvent", function() {
			var instance = new NamedFunction();
			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('before', function(invocation) {
					beforeEventCalled = true;
				});

			it("Then should call before event", function() {
				var result = instance.method();
				assert(beforeEventCalled);
			});
		});

		describe("When using afterEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('after', function(invocation) {
					afterEventCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(afterEventCalled);
			});
		});

		describe("When using doneEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('done', function(invocation) {
					doneEventCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(doneEventCalled);
			});
		});

	});

});