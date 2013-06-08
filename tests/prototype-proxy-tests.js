var should = require('should');
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
			PrototypeObject.prototype.return1 = function(){return 2;};

			var changedPrototypeObject = new PrototypeObject()
			var changedResult = changedPrototypeObject.return1();
			changedResult.should.be.eql(2);

			var copiedPrototypeObject = new copiedObject();
			var copiedResult = copiedPrototypeObject.return1();
			copiedResult.should.be.eql(1);

			copiedResult.should.not.eql(changedResult);
			onComplete();
		});
	});
});