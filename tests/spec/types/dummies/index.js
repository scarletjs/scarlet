module.exports = {
	NamedFunc: require("./named-function"),
	UnnamedFunc: require("./unnamed-function"),
	PrototypeFunc: require("./prototype-function"),
	ObjectLiteral: function() { return (require("./object-literal"))(); }
};