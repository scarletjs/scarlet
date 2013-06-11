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
			var interceptorFunction = function(invocation){
				numberOfCalls+=1;
				invocation.proceed();
			};
			var functionToIntercept = function(){
				numberOfCalls+=1;
				numberOfCalls.should.be.eql(2);
				onComplete();
			};
			interceptor.intercept(functionToIntercept).by(interceptorFunction).proceed();

		});
	});
	describe('When creating an interceptor with a defined context',function(){
		it('should create the defined context',function(onComplete){
			var interceptorFunction = function(invocation){
				numberOfCalls+=1;
				invocation.proceed();
			};

			var context = Interceptor.createInterceptorContext(interceptorFunction);
			context.name.should.not.be.eql(undefined);
			onComplete();	

		});
	});
	describe('When explicitily creating an interceptor context',function(){
		it('should create the defined context',function(onComplete){
			var interceptorFunction = function(invocation){
				numberOfCalls+=1;
				invocation.proceed();
			};

			var context = Interceptor.createInterceptorContext(interceptorFunction);
			context.name.should.not.be.eql(undefined);
			context.thisContext.should.not.be.eql(undefined);
			context.interceptorMethod.should.not.be.eql(undefined);
			context.should.be.an.instanceOf(Interceptor.InterceptorContext);
			onComplete();	

		});
	});
	describe('When creating an interceptor with a defined context',function(){
		it('should create the defined context',function(onComplete){
			var interceptorFunction = function(invocation){
				numberOfCalls+=1;
				invocation.proceed();
			};

			var interceptor = new Interceptor()
			var contextToPassIn = Interceptor.createInterceptorContext(interceptorFunction);
			var context = interceptor.by(contextToPassIn).interceptors[0];

			context.name.should.not.be.eql(undefined);
			context.thisContext.should.not.be.eql(undefined);
			context.interceptorMethod.should.not.be.eql(undefined);
			context.should.be.an.instanceOf(Interceptor.InterceptorContext);
			onComplete();	

		});
	});
	describe('When creating an interceptor without a defined context',function(){
		it('should create the defined context',function(onComplete){
			var interceptorFunction = function(invocation){
				numberOfCalls+=1;
				invocation.proceed();
			};
			var interceptor = new Interceptor()
			var context = interceptor.by(interceptorFunction).interceptors[0];

			context.name.should.not.be.eql(undefined);
			context.thisContext.should.not.be.eql(undefined);
			context.interceptorMethod.should.not.be.eql(undefined);
			context.should.be.an.instanceOf(Interceptor.InterceptorContext);
			onComplete();	

		});
	});
});