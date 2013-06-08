var should = require('should');
//var Scarlet = require("../lib/scarlet.js");
var Interceptor = require("../lib/interceptor.js");

function add1Interceptor() { };
add1Interceptor.prototype = Object.create(Interceptor.prototype);
add1Interceptor.prototype.functionInvocation = function(targetMethod, paramaters){

	var self = this;
	var result = self.proceed(targetMethod,paramaters);
	return result+1;
};

describe('Given an Interceptor Container',function(){
	// describe('When registering an interceptor for a function with a prototype',function(){
	// 	it("should call the interceptor",function(onComplete){
	// 		Scarlet.reset();
	// 		function function1(){};
	// 		function1.prototype.return1 = function(){return 1;}
	// 		var f = function1.prototype;

	// 		Scarlet.register(new add1Interceptor()).forObject(function1);
	// 		var f1 = new function1();
	// 		var result = f1.return1();
	// 		result.should.be.eql(2);

	// 		onComplete();
	// 	});
	// });
	// describe('When registering an interceptor for an object',function(){
	// 	it("should call the interceptor",function(onComplete){
	// 		Scarlet.reset();

	// 		var object = {
	// 			return1:function(){return 1;}
	// 		};

	// 		Scarlet.register(new add1Interceptor()).forObject(object);
	// 		var result = object.return1();
	// 		result.should.be.eql(2);
	// 		Scarlet.reset(object);
	// 		var result = object.return1();
	// 		result.should.be.eql(1);
	// 		onComplete();
	// 	});
	// });
	
	// describe('When registering an interceptor for a single function',function(){
	// 	it("should call the interceptor",function(onComplete){
	// 		// Scarlet.reset();
			
	// 		function return1(){return 1;}
			
	// 		return1 = Scarlet.register(new add1Interceptor()).forObject(return1);
	// 		var result = return1();
	// 		result.should.be.eql(2);
	// 		Scarlet.reset();
	// 		var result = return1();
	// 		result.should.be.eql(2);

	// 		onComplete();
	// 	});
	// });

	// describe('When registering an interceptor for an object',function(){
	// 	it("should call the interceptor",function(onComplete){
	// 		Scarlet.reset();

	// 		var Return1 = function(){
	// 			var self = this;

	// 			self.return1 = function(){ return 1;};
	// 		};

	// 		// var z = function(){};
	// 		// z = new object();
	// 		// for(var a in z){
	// 		// 	z[a] = function(){return 2;}
	// 		// }
	// 		// console.log(z.return1());

	// 		var object = new Return1();

	// 		Scarlet.register(new add1Interceptor()).forObject(object);
	// 		var result = object.return1();
	// 		result.should.be.eql(2);
	// 		Scarlet.reset();
	// 		var result = object.return1();
	// 		result.should.be.eql(1);

	// 		onComplete();
	// 	});
	// });
	// describe('When registering an interceptor for an object',function(){
	// it("should call the interceptor",function(onComplete){
	// 	function function1(){};
	// 	function1.prototype.return1 = function(){return 1;}

	// 	function1.return2 = function(){return 2;};

	// 	for(var a in function1){
	// 		console.log(a);
	// 	}
	// 	for(var a in function1.prototype){
	// 		console.log(a);
	// 	}
	// 	//var f1 = new function1();


	// 	onComplete();
	// });
// });
});