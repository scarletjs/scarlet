var should = require('should');
var Scarlet = require("../lib/scarlet.js");
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor() { 
	var self = this;
	var result = self.proceed(arguments);
	return result+1;
};

describe('Given an Interceptor Container',function(){

		describe('When registering an interceptor',function(){
			it("should call the interceptor",function(onComplete){
				Scarlet.resetAll();
				function function1(){};
				function1.prototype.return1 = function(){
					return 1;
				}

				Scarlet.register(add1Interceptor).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering and then reseting the container',function(){
			it("should resetAll protoype of object",function(onComplete){
				Scarlet.resetAll();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				Scarlet.register(add1Interceptor).forObject(function1);
				Scarlet.resetAll();

				var after = new function1();
				var result = after.return1();
				result.should.be.eql(1);
				onComplete();
				
			});
		});

		describe('When registering two interceptors for the different objects',function(){
			Scarlet.resetAll();

			it("should intercept both",function(onComplete){
				Scarlet.resetAll();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				Scarlet.register(add1Interceptor).forObject(function1);
				Scarlet.register(add1Interceptor).forObject(function2);

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
			Scarlet.resetAll();

			it("should resetAll both",function(onComplete){
				Scarlet.resetAll();
				function function1(){};
				function1.prototype.return1 = function(){return 1;}

				function function2(){};
				function2.prototype.return2 = function(){return 2;}

				Scarlet.register(add1Interceptor).forObject(function1);
				Scarlet.register(add1Interceptor).forObject(function2);
				Scarlet.resetAll();

				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(1);

				var f2 = new function2();
				var result = f2.return2();
				result.should.be.eql(2);
				onComplete();
				
			});
		 });


		describe('When registering an interceptor for an object instance',function(){

			it("should apply interceptor",function(onComplete){
				Scarlet.resetAll();
				function function1(){
					this.return1 = function(){return 1;}
				};
				var f1 = new function1();
				Scarlet.register(add1Interceptor).forObject(f1);
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		 });
});