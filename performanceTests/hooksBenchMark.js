var l = console.log;
var hooks = require('hooks');
var Benchmark = require('benchmark');


function inter(invocation){
	invocation.proceed();
};

var instance = function(){};

module.exports.namedFunctionInstance = new Benchmark('hooks',function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var NamedFunction = require("../tests/dummies/named-function");

			instance = new NamedFunction();

			for (var k in hooks) {
			  instance[k] = hooks[k];
			}

			instance.pre('method', function (next){
				next();
			});

			instance.post('method', function(next){
				next();
			});
		}
	}
);