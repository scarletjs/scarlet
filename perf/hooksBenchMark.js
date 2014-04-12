var l = console.log;
var hooks = require('hooks');
var Benchmark = require('benchmark');

var instance = function() {};

module.exports.namedFunctionInstance = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var NamedFunction = require("../tests/spec/types/dummies/named-function");
		instance = new NamedFunction();
		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});

module.exports.unnamedFunctionInstance = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var UnNamedFunction = require("../tests/spec/types/dummies/unnamed-function");
		instance = new UnNamedFunction();
		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});

module.exports.prototypeFunction = new Benchmark('hooks', function() {
	instance.m2();
}, {
	'onStart': function() {
		var BasePrototypeFunction = require("../tests/spec/types/dummies/prototype-function");
		var PrototypeFunction = function() {};
		PrototypeFunction.prototype = Object.create(BasePrototypeFunction.prototype);
		for (var k in hooks) {
			PrototypeFunction[k] = hooks[k];
		}
		PrototypeFunction.prototype.m2 = function() {};
		PrototypeFunction.pre('m2', function(next) {
			next();
		});
		PrototypeFunction.post('m2', function(next) {
			next();
		});
		instance = new PrototypeFunction();
	}
});

module.exports.objectLiteral = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var baseObjectLiteral = require("../tests/spec/types/dummies/object-literal");
		instance = baseObjectLiteral();
		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});

module.exports.multipleInterceptorNamedFunctionInstance = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var NamedFunction = require("../tests/spec/types/dummies/named-function");
		instance = new NamedFunction();
		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});

module.exports.multipleInterceptorObjectLiteral = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var baseObjectLiteral = require("../tests/spec/types/dummies/object-literal");
		instance = baseObjectLiteral();

		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});

module.exports.multipleInterceptorPrototypeFunction = new Benchmark('hooks', function() {
	instance.m2();
}, {
	'onStart': function() {
		var BasePrototypeFunction = require("../tests/spec/types/dummies/prototype-function");
		var PrototypeFunction = function() {};
		PrototypeFunction.prototype = Object.create(BasePrototypeFunction.prototype);
		for (var k in hooks) {
			PrototypeFunction[k] = hooks[k];
		}
		PrototypeFunction.prototype.m2 = function() {};
		PrototypeFunction.pre('m2', function(next) {
			next();
		});
		PrototypeFunction.pre('m2', function(next) {
			next();
		});
		PrototypeFunction.post('m2', function(next) {
			next();
		});
		PrototypeFunction.post('m2', function(next) {
			next();
		});
		instance = new PrototypeFunction();
	}
});


module.exports.multipleInterceptorUnnamedFunctionInstance = new Benchmark('hooks', function() {
	instance.method();
}, {
	'onStart': function() {
		var UnNamedFunction = require("../tests/spec/types/dummies/unnamed-function");
		instance = new UnNamedFunction();
		for (var k in hooks) {
			instance[k] = hooks[k];
		}
		instance.pre('method', function(next) {
			next();
		});
		instance.post('method', function(next) {
			next();
		});
	}
});