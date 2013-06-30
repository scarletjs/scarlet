var l = console.log;
var Benchmark = require('benchmark');
var hooksBenchMark = require('./hooksBenchMark');
var scarletBenchMark = require('./scarletBenchMark');

var suites = [];

Benchmark.extend(Benchmark.Suite.options, {
    'onStart': function() {
      console.log('\n' + this.name + ':');
    },
    'onCycle': function(event) {
      console.log(String(event.target));
    },
	'onComplete': function() {
	  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	}
});

suites.push(
	function(){
		var self = this;

		var s = Benchmark.Suite("Intercepting an Instance of a NamedFunction");
		s.push(hooksBenchMark.namedFunctionInstance);
		s.push(scarletBenchMark.namedFunctionInstance);

		 return s.run();

	}
);

for (var i = 0; i < suites.length; i++) {
	suites[i]();
};