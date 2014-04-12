var l = console.log;
var Benchmark = require('benchmark');
var Scarlet = require("../lib/scarlet");

function interceptor(proceed) {
	return proceed();
};

var instance = function() {};

module.exports.namedFunctionInstance = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var NamedFunction = require("../tests/spec/types/dummies/named-function");
		instance = new NamedFunction();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor);
	}
});

module.exports.unnamedFunctionInstance = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var UnNamedFunction = require("../tests/spec/types/dummies/unnamed-function");
		instance = new UnNamedFunction();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor);
	}
});

module.exports.prototypeFunction = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var BasePrototypeFunction = require("../tests/spec/types/dummies/prototype-function");
		var PrototypeFunction = function() {};
		PrototypeFunction.prototype = Object.create(BasePrototypeFunction.prototype);
		PrototypeFunction = scarlet
			.intercept(PrototypeFunction, scarlet.PROTOTYPE)
			.using(interceptor)
			.proxy();
		instance = new PrototypeFunction();
	}
});

module.exports.objectLiteral = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var baseObjectLiteral = require("../tests/spec/types/dummies/object-literal");
		instance = baseObjectLiteral();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor);
	}
});

module.exports.multipleInterceptorNamedFunctionInstance = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var NamedFunction = require("../tests/spec/types/dummies/named-function");
		instance = new NamedFunction();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor)
			.using(interceptor);
	}
});

module.exports.multipleInterceptorObjectLiteral = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var baseObjectLiteral = require("../tests/spec/types/dummies/object-literal");
		instance = baseObjectLiteral();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor)
			.using(interceptor);
	}
});

module.exports.multipleInterceptorPrototypeFunction = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var BasePrototypeFunction = require("../tests/spec/types/dummies/prototype-function");
		var PrototypeFunction = function() {};
		PrototypeFunction.prototype = Object.create(BasePrototypeFunction.prototype);
		PrototypeFunction = scarlet
			.intercept(PrototypeFunction, scarlet.PROTOTYPE)
			.using(interceptor)
			.using(interceptor)
			.proxy();
		instance = new PrototypeFunction();
	}
});

module.exports.multipleInterceptorUnnamedFunctionInstance = new Benchmark('scarlet', function() {
	instance.method();
}, {
	'onStart': function() {
		var scarlet = new Scarlet();
		var UnNamedFunction = require("../tests/spec/types/dummies/unnamed-function");
		instance = new UnNamedFunction();
		scarlet
			.intercept(instance, scarlet.INSTANCE)
			.using(interceptor)
			.using(interceptor);
	}
});