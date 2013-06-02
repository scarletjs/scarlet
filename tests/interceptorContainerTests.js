var should = require('should');
var Scarlet = require("../lib/scarlet.js");
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor() { };
add1Interceptor.prototype = Object.create(Interceptor.prototype);
add1Interceptor.prototype.functionInvocation = function(targetMethod, paramaters){
	var self = this;
	var result = self.proceed(targetMethod,paramaters);
	return result+1;
};

describe('Given an Interceptor Container',function(){

		describe('When registering an interceptor',function(){
			it("should call the interceptor",function(onComplete){
				Scarlet.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				Scarlet.register(new add1Interceptor()).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering and then reseting the container',function(){
			it("should reset protoype of object",function(onComplete){
				Scarlet.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				Scarlet.register(new add1Interceptor()).forObject(function1);
				Scarlet.reset();

				var after = new function1();
				var result = after.return1();
				result.should.be.eql(1);
				onComplete();
				
			});
		});

		describe('When registering two interceptors for the different objects',function(){
			Scarlet.reset();

			it("should intercept both",function(onComplete){
				Scarlet.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				Scarlet.register(new add1Interceptor()).forObject(function1);
				Scarlet.register(new add1Interceptor()).forObject(function2);

				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				var f2 = new function2();
				var result = f2.return2();
				result.should.be.eql(3);
				onComplete();
				
			});
		 });

		describe('When registering two interceptors for different objects then resetting',function(){
			Scarlet.reset();

			it("should reset both",function(onComplete){
				Scarlet.reset();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				Scarlet.register(new add1Interceptor()).forObject(function1);
				Scarlet.register(new add1Interceptor()).forObject(function2);
				Scarlet.reset();

				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(1);

				var f2 = new function2();
				var result = f2.return2();
				result.should.be.eql(2);
				onComplete();
				
			});
		 });
		describe('When registering two interceptors for the same object',function(){
			Scarlet.reset();

			it("should throw",function(onComplete){
				Scarlet.reset();
				function function1(){};
				function function2(){};

				try{
					Scarlet.register(new add1Interceptor()).forObject(function1);
					Scarlet.register(new add1Interceptor()).forObject(function1);
				}catch(exception){
					onComplete();
				}
				
			});
		 });

		describe('When registering a single interceptor for an object',function(){
			it("should not throw",function(onComplete){
				Scarlet.reset();
				function function1(){};
				Scarlet.register(new add1Interceptor()).forObject(function1);
				onComplete();				
			});
		 });


		describe('When registering an interceptor for an object instance',function(){

			it("should throw",function(onComplete){
				Scarlet.reset();
				function function1(){};

				try{
					Scarlet.register(new add1Interceptor()).forObject(new function1());
				}catch(exception){
					onComplete();
				}

				
			});
		 });
});