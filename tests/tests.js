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
var object = {
	return1:function(){return 1;}
};
describe('Given an Interceptor Container',function(){
	describe('When registering an interceptor for a function with a prototype',function(){
		it("should call the interceptor",function(onComplete){
			Scarlet.reset();
			function function1(){};
			function1.prototype.return1 = function(){return 1;}
			var f = function1.prototype;

			Scarlet.register(new add1Interceptor()).forObject(function1);
			var f1 = new function1();
			var result = f1.return1();
			result.should.be.eql(2);

			onComplete();
		});
	});
	describe('When registering an interceptor for an object',function(){
		it("should call the interceptor",function(onComplete){
			Scarlet.reset();

			Scarlet.register(new add1Interceptor()).forObject(object);
			var result = object.return1();
			result.should.be.eql(2);
			Scarlet.reset(object);
			console.log(object);
			var result = object.return1();
			console.log(result);
			result.should.be.eql(1);
			onComplete();
		});
	});
});