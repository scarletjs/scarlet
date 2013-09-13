var log = console.log;
var util = require("util");
var inspect = util.inspect;

module.exports = {
	// Node modules
	util: require("util"),
	path: require("path"),
	assert: require("assert"),
	events: require("events"),
	// Diagnostics methods
	l: log,
	i: inspect,
	ll: function(val) { log(inspect(val)); } 
};
