var l = console.log;
var scarlet = require("../lib/scarlet");
var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

function inter(invocation){
	invocation.proceed();
};


function NamedFunction(){
	
	this.property = "";

	this.method = function(){
	};
	
	this.methodWithReturn = function(){
		return "any";
	};
};

var instance = function(){};

var noInterceptor = new Benchmark('Scarlet#NoInterceptor', function(){
	instance.method();
},{
	'onStart' : function(){
		instance = new NamedFunction();

	}
});

var interceptor = new Benchmark('Scarlet#Interceptor', function(){
	instance.method();
},{
	'onStart' : function(){
		instance = new NamedFunction();

		scarlet
			.intercept(instance)
			.using(inter);

	}
});

suite.push(noInterceptor);
suite.push(interceptor);

suite.on('cycle', function(event) {
  console.log(String(event.target));
})

suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.run();