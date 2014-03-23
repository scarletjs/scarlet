var assert = require("assert");

describe("Given lib/extensions/Logger", function(){

	var ext = require("../../../../lib/extensions");
	ext.logger.log = function(){};

	describe("When #print(type, obj, func, msg, args)", function(){

		function SampleType(){
			this.sampleMethod = function(arg1, arg2, arg3){
				return arg2;
			};
		}

		it("Then it should not throw when logging to print", function(){
			var didThrowException = false;
			try{
				ext.logger.print("TEST", SampleType, "sampleMethod", "any message", ["argVal1", "argVal2", "argVal3"]);
			}catch(exception){
				didThrowException = true;
			}
			assert(!didThrowException);

		});

	});

});