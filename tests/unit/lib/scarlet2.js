var Scarlet = require('../../../lib/scarlet');

describe("asdf",function(){
	
	var scarlet = new Scarlet();

	it("slh",function(done){
		// A function that does addition

		function MyClass() {
		    var self = this;
		    console.log("MyClass constructor");
		    //self.memberProperty1 = "any";
		    self.memberFunction1 = function() {return "any"};
		    //self.memberFunction2 = function() {};
		}
		
		var ProxiedClass = scarlet
			.intercept(MyClass, scarlet.PROTOTYPE)
			.using(function(proceed,invocation){
				console.log("interceptor called");
				console.log("name:"+invocation.memberName())
				console.log("name:"+invocation.contextName())
				var result = proceed();
				//console.log(invocation);
				//console.log("in result:"+result);
				return 123;
			})
			.using(function(proceed,invocation){
				proceed();
			})
			.on('before',function () {
				console.log('before event');
			}).on('after',function () {
				console.log('after event');
			})
			.on('error',function(error){
				//console.log(error);
			})
			.proxy();

		var instance = new ProxiedClass();
		instance.memberFunction1();
		done();
	})
	// it("slh",function(done){
	// 	// A function that does addition
	// 	function add(arg1, arg2){
	// 		console.log("In add");
	// 		this.otherAdd = function(){
	// 			return "alsdkjf";
	// 		}
	// 		return arg1 + arg2;
	// 	}

	// 	// Log arguments and result of add
	// 	add = scarlet
	// 		.intercept(add, scarlet.PROTOTYPE)
	// 		.using(function(proceed,invocation){
	// 			console.log("in");
	// 			console.log("name:"+invocation.memberName())
	// 			var result = proceed();
	// 			console.log(invocation);
	// 			console.log("in result:"+result);
	// 			return 123;
	// 		})
	// 		.on('before',function () {
	// 			console.log('before event');
	// 		}).on('after',function () {
	// 			console.log('after event');
	// 		}).on('error',function(error){
	// 			console.log(error);
	// 		})
	// 		.proxy();

	// 	var r =add(1,2); // Output -> Adding '1' and '2'\n Result is '3'
	// 	console.log("result:"+r);
	// 		done();
	// })
})