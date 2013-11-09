var log = console.log;
var util = require("util");
var print = util.print;
var inspect = util.inspect;

module.exports = {
	util: require("util"),
	path: require("path"),
	assert: require("assert"),
	events: require("events"),
	ext: require("./lib/extensions"),
	l: log,
	p: print,
	i: inspect,
	ll: function(val) { log(inspect(val)); } 
};

