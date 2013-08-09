var assert = require("assert");


/**
	The object or function that has been intercepted

	@class Invocation
	@constructor
	@param {Function|Object} object the original object or function
	@param {Function|Object} method the method being intercepted
	@param {Function|Object} args the original args passed into the function being intercepted
	@required
**/
function Invocation(object, method, args) {

	assert(args, "Scarlet::Invocation::args == null");
	assert(object, "Scarlet::Invocation::object == null");
	assert(method, "Scarlet::Invocation::method == null");

	var self = this;

	/**
	 * The original args passed into the function being intercepted
     * @property args 
     * @type Object
     */
	self.args = args;

	/**
	 * The original object or function
     * @property object 
     * @type Function|Object
     */
	self.object = object;

	/**
	 * The method being intercepted
     * @property method
     * @type Array
     */
	self.method = method;

	/**
	 * The result of the method being intercepted
     * @property result
     * @type  Function|Object
     */
	self.result = null;

	/**
	 * Allows the intercepted method to be called
     * @method proceed
     * @return Function|Object of the result of the method call
     */
	self.proceed = function() {
		var parameters = Array.prototype.slice.call(args);
		self.result = self.method.apply(self.object, parameters);
		return self.result;
	};
}

module.exports = Invocation;