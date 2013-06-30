var l = console.log;
var Benchmark = require('benchmark');
var scarlet = require("../lib/scarlet");

function interceptor(invocation){
	invocation.proceed();
};

var instance = function(){};

module.exports.namedFunctionInstance = new Benchmark('scarlet', function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var NamedFunction = require("../tests/dummies/named-function");

			instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor);

		}
	}
);