var should = require('should');
var Interceptor = require("../lib/interceptor.js");

describe('Given an Interceptor',function(){
	describe('When call target to invoke is not a function',function(){
		it("should return target if is not a function",function(onComplete){
			var interceptor = new Interceptor();
			var aNumber = 1;
			var target = interceptor.intercept(aNumber).proceed();
			target.should.be.eql(aNumber);

			onComplete();
		});
		it("should return undefined if no target is specified",function(onComplete){
			var interceptor = new Interceptor();
			var target = interceptor.proceed();
			should.equal(undefined, target);
			
			onComplete();
		});
	});
	describe('When target to invoke throws an error',function(){
		it('should throw an error',function(onComplete){
			var interceptor = new Interceptor();
			var target = function(){throw new Error("An Error");};
			try{
				interceptor.intercept(target).proceed()
			} catch(exception){
				onComplete();
			}

		});
	});
	describe('When target to invoke has paramaters',function(){
		it('should call target with given paramaters',function(onComplete){
			var interceptor = new Interceptor();
			var testParamater = Object.create(arguments);
			testParamater[0] = 1;

			var target = function(paramater){
				paramater.should.be.eql(testParamater);
				onComplete();
			};
			
			interceptor.intercept(target).proceed(testParamater);
		});
	});
	describe('When target to invoke doesnt have paramaters',function(){
		it('should call target without paramaters',function(onComplete){
			var interceptor = new Interceptor();
			var target = function(){
				onComplete();
			};
			
			interceptor.intercept(target).proceed();

		});
	});
	describe('When setting up multiple targets to call',function(){
		it('should call all functions',function(onComplete){
			var interceptor = new Interceptor();
			var numberOfCalls = 0;
			var firstFunction = function(){
				numberOfCalls+=1;
				this.proceed(arguments);
			};
			var lastFunction = function(){
				numberOfCalls+=1;
				numberOfCalls.should.be.eql(2);
				onComplete();
			};
			interceptor.intercept(lastFunction).by(firstFunction).proceed();

		});
	});
});