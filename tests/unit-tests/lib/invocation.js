require("../../../include");

describe("Given /lib/Invocation", function(){

	var Invocation = require("../../../lib/invocation");

	function _throws(callback) {
		var didThrow = false;
		try { callback() }
		catch (err) { didThrow = true; }
		return didThrow;
	}

	function _doesNotThrow(callback) {
		return !_throws(callback);
	}

	describe("When #ctor()", function(){

		it("Then should throw if 'object' and/or 'method' parameter is null", function(){
			assert(_throws(function(){
				new Invocation(null, null);
			}), "new Invocation(null, null) should throw");
			assert(_throws(function(){
				new Invocation({}, null);
			}), "new Invocation(obj!=null, null) should throw");
			assert(_throws(function(){
				new Invocation(null, function(){});
			}), "new Invocation(null, method!=null) should throw");
			assert(_doesNotThrow(function(){
				new Invocation({}, function(){});
			}), "new Invocation(obj!=null, method!=null) should not throw");
		});

	});

	describe("When #proceed()", function(){

		var methodCalled = false;

		var obj = {
			anyMethod: function(){
				methodCalled = true;
			}
		}
		
		var invocation = new Invocation(obj, obj.anyMethod);

		it("Then should not allow the method to execute more than once", function(){
			assert(_doesNotThrow(function(){
				invocation.proceed();
			}));
			assert(_throws(function(){
				invocation.proceed();
			}));
			assert(methodCalled);
		});

	});

});