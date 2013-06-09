var should = require('should');
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor() { };
add1Interceptor.prototype = Object.create(Interceptor.prototype);
add1Interceptor.prototype.functionInvocation = function(targetMethod, paramaters){
	var self = this;
	var result = self.proceed(targetMethod,paramaters);
	return result+1;
};

describe('Given an Interceptor',function(){
	var interceptor = new Interceptor();
	describe('When call target to invoke is not a function',function(){
		it("should return target if is not a function",function(onComplete){
			var aNumber = 1;
			var target = interceptor.functionInvocation(aNumber);
			target.should.be.eql(aNumber);

			onComplete();
		});
		it("should return undefined if no target is specified",function(onComplete){
			var target = interceptor.functionInvocation();
			should.equal(undefined, target);
			
			onComplete();
		});
	});
	describe('When target to invoke throws an error',function(){
		it('should throw an error',function(onComplete){
			var target = function(){throw new Error("An Error");};
			try{
				interceptor.functionInvocation(target)
			} catch(exception){
				onComplete();
			}

		});
	});
	describe('When target to invoke doesnt have paramaters',function(){
		it('should call target without paramaters',function(onComplete){
			var target = function(){
				onComplete();
			};
			
			interceptor.functionInvocation(target);

		});
	});
	describe('When target to invoke has paramaters',function(){
		it('should call target with given paramaters',function(onComplete){
			var testParamater = Object.create(arguments);
			testParamater[0] = 1;

			var target = function(paramater){
				paramater.should.be.eql(testParamater[0]);
				onComplete();
			};
			
			interceptor.functionInvocation(target,testParamater);
		});
	});
});