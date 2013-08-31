util = require("util");
path = require("path");
assert = require("assert");
events = require('events');

l = console.log;
i = util.inspect;
ll = function(val) { l(i(val)); } 
