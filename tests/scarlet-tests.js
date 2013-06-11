var should = require('should');
var Scarlet = require("../lib/scarlet.js");
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor(invocation) { 
	var self = this;
	var result = invocation.proceed();
	return result+1;
};

describe('Given an Interceptor Container',function(){

		describe('When registering an interceptor for a method with a return to self',function(){
			it("should not update self",function(onComplete){
				Scarlet.resetAll();
				function function1(){
					var self = this;
					self.aValue = 1;
				};
				function1.prototype.return1 = function(){
					var self = this;
					return self.aValue;
				}

				Scarlet.register(add1Interceptor).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering an interceptor with a self reference',function(){
			it("should not update self",function(onComplete){
				Scarlet.resetAll();
				var selfAddInterceptor = function(){
					var self = this;
					self.valueToAdd = 1;
				};
				selfAddInterceptor.prototype.add = function(invocation) { 
					var self = this;
					var result = invocation.proceed();
					return result+self.valueToAdd;
				};
				function function1(){
					var self = this;
					self.aValue = 1;
				};
				function1.prototype.return1 = function(){
					var self = this;
					return self.aValue;
				}

				var interceptor = new selfAddInterceptor();
				Scarlet.register(interceptor,interceptor.add).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering an interceptor that hasnt been initialized and a interceptor method has been specified',function(){
			it("should throw error",function(onComplete){
				try{
					Scarlet.resetAll();
					var selfAddInterceptor = function(){
						var self = this;
						self.valueToAdd = 1;
					};
					selfAddInterceptor.prototype.add = function(invocation) { 
						var self = this;
						var result = invocation.proceed();
						return result+self.valueToAdd;
					};

					function function1(){};

					Scarlet.register(selfAddInterceptor,selfAddInterceptor.add).forObject(function1);
				}
				catch(exception){

					onComplete();
				}
				
			});
		});
		describe('When registering an interceptor as an object with a self reference',function(){
			it("should be able to intercept using a self reference",function(onComplete){
				Scarlet.resetAll();
				var selfAddInterceptor ={
					valueToAdd : 1,
					add : function(invocation) { 
						var self = this;
						var result = invocation.proceed();
						return result+self.valueToAdd;
					}
				};

				function function1(){
					var self = this;
					self.aValue = 1;
				};
				function1.prototype.return1 = function(){
					var self = this;
					return self.aValue;
				}
			
				Scarlet.register(selfAddInterceptor,selfAddInterceptor.add).forObject(function1);
				var f1 = new function1();
				var result = f1.return1();
				result.should.be.eql(2);

				onComplete();
			});
		});
		describe('When registering an interceptor as an object',function(){
			describe('When no interceptor method specified in registration',function(){
				it("should throw an error",function(onComplete){
					try{
						Scarlet.resetAll();
						var selfUndefinedInterceptor ={};

						function function1(){};
					
						Scarlet.register(selfAddInterceptor).forObject(function1);
					}
					catch(exception){

						onComplete();
					}
				});
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