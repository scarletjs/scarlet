var log = console.log;
var util = require("util");
var print = util.print;
var inspect = util.inspect;

module.exports = {
	l: log,
	p: print,
	i: inspect,
	util: require("util"),
	path: require("path"),
	assert: require("assert"),
	events: require("events"),
	ext: require("./lib/extensions"),
	ll: function(val) { log(inspect(val)); }
};

