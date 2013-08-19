var assert = require("assert");

function Invocation(object, method, args) {

	assert(args, "Scarlet::Invocation::args == null");
	assert(object, "Scarlet::Invocation::object == null");
	assert(method, "Scarlet::Invocation::method == null");

	var self = this;

	/**
	 * The original arguments passed into the function being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Object} - the argument object based into objects
	 */
	self.args = args;

	/**
	 * The reference to self for the original/called methd
	 * 
	 * @category Invocation Attributes
	 * @type {Object}
	 */
	self.object = object;

	/**
	 * The method being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Function}
	 */
	self.method = method;

	/**
	 * The result of the method being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Any}
	 */
	self.result = null;

	/**
	 * Calls the intercepted method
	 * 
	 * @category Invocation Attributes
     * @method proceed
     * @return Function|Object of the result of the original method call
     */
	self.proceed = function() {
		var parameters = Array.prototype.slice.call(args);
		self.result = self.method.apply(self.object, parameters);
		return self.result;
	};
}

module.exports = Invocation;