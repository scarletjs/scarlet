var l = console.log;
var Benchmark = require('benchmark');
var Scarlet = require("../lib/scarlet");

function interceptor(invocation){
	invocation.proceed();
};

var instance = function(){};

module.exports.namedFunctionInstance = new Benchmark('scarlet', function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var scarlet = new Scarlet();

			var NamedFunction = require("../tests/dummies/named-function");

			instance = new NamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor);

		}
	}
);

module.exports.unnamedFunctionInstance = new Benchmark('scarlet', function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var scarlet = new Scarlet();

			var UnNamedFunction = require("../tests/dummies/unnamed-function");

			instance = new UnNamedFunction();

			scarlet
				.intercept(instance)
				.using(interceptor);

		}
	}
);

module.exports.prototypeFunction = new Benchmark('scarlet', function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var scarlet = new Scarlet();

			var BasePrototypeFunction = require("../tests/dummies/prototype-function");

			var PrototypeFunction = function(){};
			PrototypeFunction.prototype = Object.create(BasePrototypeFunction.prototype);

			PrototypeFunction = scarlet
							.intercept(PrototypeFunction)
							.using(interceptor);

			instance = new PrototypeFunction();
		}
	}
);

module.exports.objectLiteral = new Benchmark('scarlet', function(){
		instance.method();
	},
	{
		'onStart' : function(){
			var scarlet = new Scarlet();

			var baseObjectLiteral = require("../tests/dummies/object-literal");
			instance = Object.create(baseObjectLiteral);

			scarlet
				.intercept(instance)
				.using(interceptor);

		}
	}
);