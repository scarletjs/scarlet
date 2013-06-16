var lib = {
	Enumerable: require("./enumerable"),
	Interceptor: require("./interceptor"),
	Invocation: require("./invocation"),
	ProxyInstance: require("./proxy-instance"),
	ProxyPrototype: require("./proxy-prototype")
};


module.exports = require("./scarlet");
module.exports.lib = lib;