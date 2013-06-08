var should = require('should');
var Scarlet = require("../lib/scarlet.js");
var Interceptor = require("../lib/interceptor.js");
var PrototypeProxy = require("../lib/prototype-proxy.js");

function add1Interceptor() { };
add1Interceptor.prototype = Object.create(Interceptor.prototype);
add1Interceptor.prototype.functionInvocation = function(targetMethod, paramaters){

	var self = this;
	var result = self.proceed(targetMethod,paramaters);
	return result+1;
};

describe('When using a prototype proxy',function(){
	var proxy = new PrototypeProxy();

	describe('When creating a proxy',function(){
		var PrototypeObject = function(){};
		PrototypeObject.prototype.return1 = function(){return 1;};

		var returnedProxyObject =  proxy.create(PrototypeObject,new add1Interceptor());		

		it("should update the proxied object with an interceptor",function(onComplete){
			var updatedPrototyeObject = new PrototypeObject();
			var result = updatedPrototyeObject.return1();
			result.should.be.eql(2);

			onComplete();
		});

		it("should return the proxied object",function(onComplete){
			var updatedPrototyeObject = new returnedProxyObject();
			var result = updatedPrototyeObject.return1();
			result.should.be.eql(2);

			onComplete();
		});
	});

	describe('When copying object functions',function(){
		var PrototypeObject = function(){};
		PrototypeObject.prototype.return1 = function(){return 1;};

		var copiedObject =  proxy.saveOriginalObject(PrototypeObject);		

		it("should not change copied object when object that was copied changes",function(onComplete){
			PrototypeProxy.prototype.return1 = function(){return 2;};

			var changedPrototypeObject = new PrototypeProxy()
			var changedResult = changedPrototypeObject.return1();
			changedResult.should.be.eql(2);

			var copiedPrototypeObject = new copiedObject();
			var copiedResult = copiedPrototypeObject.return1();
			copiedResult.should.be.eql(1);

			copiedResult.should.not.eql(changedResult);
			onComplete();
		});
	});
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

});