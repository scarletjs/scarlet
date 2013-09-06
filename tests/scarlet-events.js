require("../include");

var scarlet = new(require("../lib/scarlet"))();

var ObjectLiteral = require("./dummies/object-literal");
var NamedFunction = require("./dummies/named-function");
var UnnamedFunction = require("./dummies/unnamed-function");
var PrototypeFunction = require("./dummies/prototype-function");

describe("Given we are using scarlet events", function() {

	var methodWasCalled = false;

	function interceptor(proceed, invocation) {

		var result = proceed();
		methodWasCalled = true;
		return result;
	};

	describe("When using interceptor events", function() {

		var doneEventWasCalled = false;
		var afterEventWasCalled = false;
		var beforeEventWasCalled = false;

		beforeEach(function() {
			doneEventWasCalled = false;
			afterEventWasCalled = false;
			beforeEventWasCalled = false;
		});

		describe("When using beforeEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('before', function(invocation) {
					beforeEventWasCalled = true;
				});

			it("Then should call before event", function() {
				var result = instance.method();
				assert(beforeEventWasCalled);
			});
		});

		describe("When using afterEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('after', function(invocation) {
					afterEventWasCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(afterEventWasCalled);
			});
		});

		describe("When using doneEvent", function() {
			var instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor)
				.on('done', function(invocation) {
					doneEventWasCalled = true;
				});

			it("Then should call after event", function() {
				var result = instance.method();
				assert(doneEventWasCalled);
			});
		});

	});

});