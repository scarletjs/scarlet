var l = console.log;
var Benchmark = require('benchmark');
var benchmarkRunner = require('./benchmarkRunner');
var hooksBenchMark = require('./hooksBenchMark');
var scarletBenchMark = require('./scarletBenchMark');

var suites = [];

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Intercepting an Instance of a Named Function");
		s.push(scarletBenchMark.namedFunctionInstance);
		s.push(hooksBenchMark.namedFunctionInstance);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Intercepting a Prototype Function");
		s.push(scarletBenchMark.prototypeFunction);
		s.push(hooksBenchMark.prototypeFunction);
		return s.run();
	}
);


suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Intercepting a Un-Named Function");
		s.push(scarletBenchMark.unnamedFunctionInstance);
		s.push(hooksBenchMark.unnamedFunctionInstance);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Intercepting a Object Literal");
		s.push(scarletBenchMark.objectLiteral);
		s.push(hooksBenchMark.objectLiteral);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Multiple Interception using a Named Function");
		s.push(scarletBenchMark.multipleInterceptorNamedFunctionInstance);
		s.push(hooksBenchMark.multipleInterceptorNamedFunctionInstance);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Multiple Interception using a Object Literal");
		s.push(scarletBenchMark.multipleInterceptorObjectLiteral);
		s.push(hooksBenchMark.multipleInterceptorObjectLiteral);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Multiple Interception using a Prototype Function");
		s.push(scarletBenchMark.multipleInterceptorPrototypeFunction);
		s.push(hooksBenchMark.multipleInterceptorPrototypeFunction);
		return s.run();
	}
);

suites.push(
	function() {
		var self = this;
		var s = Benchmark.Suite("Multiple Interception using a Un-Named Function");
		s.push(scarletBenchMark.multipleInterceptorUnnamedFunctionInstance);
		s.push(hooksBenchMark.multipleInterceptorUnnamedFunctionInstance);
		return s.run();
	}
);

benchmarkRunner.run(suites);