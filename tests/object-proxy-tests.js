var should = require('should');
var Interceptor = require("../lib/interceptor.js");
var ObjectProxy = require("../lib/object-proxy.js");

function add1Interceptor(invocation) { 
	var self = this;
	var result = invocation.proceed();
	return result+1;
};

describe('When using a object proxy',function(){
	var proxy = new ObjectProxy();

	describe('When creating a proxy',function(){
		var object = {
			return1 : function(){return 1;}
		};

		var returnedProxyObject =  proxy.create(object,add1Interceptor);		

		it("should update the proxied object with an interceptor",function(onComplete){
			var result = object.return1();
			result.should.be.eql(2);

			onComplete();
		});

		it("should return the proxied object",function(onComplete){
			var result = returnedProxyObject.return1();
			result.should.be.eql(2);

			onComplete();
		});
	});

	describe('When copying object functions',function(){
		var object = {
			return1 : function(){return 1;}
		};

		var copiedObject =  proxy.saveOriginalObject(object);		

		it("should not change copied object when object that was copied changes",function(onComplete){
			object.return1 = function(){return 2;};

			var changedResult = object.return1();
			changedResult.should.be.eql(2);

			var copiedResult = copiedObject.return1();
			copiedResult.should.be.eql(1);

			copiedResult.should.not.eql(changedResult);
			onComplete();
		});
	});
});