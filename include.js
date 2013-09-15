var log = console.log;
var util = require("util");
var inspect = util.inspect;

// Optional debug extension
Object.prototype.__trace = function() {
	var stack = new Error().stack
	log(stack);
}

module.exports = {
	// Node modules
	util: require("util"),
	path: require("path"),
	assert: require("assert"),
	events: require("events"),
	// Scarlet modules
	ext: require("./lib/extensions"),
	// Diagnostics methods
	l: log,
	i: inspect,
	ll: function(val) { log(inspect(val)); } 
};

