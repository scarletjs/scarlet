var Scarlet = require('../lib/scarlet');

var scarlet = new Scarlet();

// describe('blah blah', function(){
// 	it('slfjkslfj',function(done){
// 		function interceptor(proceed,invocation){
// 			proceed();
// 		}
// 		scarlet.intercept(Math,'max').using(interceptor);
// 		var x = Math.max(123,5,1);
// 		console.log(x);

// 	});
// });

// describe('blah blah', function(){
// 	it('slfjkslfj',function(done){
// 		var y = 0;

// 		function interceptor(proceed,invocation){
// 			console.log("interceptor")
			

// 			setTimeout(function() {
// 				console.log("timeout complete");			
// 				y= proceed();
// 				console.log("-----------");
// 				console.log(invocation);
// 				console.log("-----------");
// 				done();	
// 			}, 10);


// 			console.log("Interceptor1 returned");
// 			return y;
// 		}
// 		scarlet.intercept(Math,'max').using(interceptor).after(function(invocation){
// 			console.log("all Complete");
// 			//console.log(invocation);
// 		});

// 		var x = Math.max(123,5,1);
// 		//var j = Math.max(555,666,777);
// 		console.log(x);
// 		console.log(y);
// 		console.log("done");
// 			setTimeout(function() {
// 		console.log(x);
// 		//console.log(j);
// 				done();				
// 			}, 200);
// 	});
// });