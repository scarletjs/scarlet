var assert = require("assert");


/**
 * The object or function that has been intercepted
 *
 * Maintains the following properties for the object or function being intercepted:
 * 
 * * args (Object) - The original args passed into the function being intercepted
 * * object (Function|Object) - The original object or function
 * * method (Function|Object) - The method being intercepted
 * * result (Function|Object) - The result of the method being intercepted
 * 
 * @category Invocation
 * @class Invocation
 * @constructor
 * @param {Function|Object} object the original object or function
 * @param {Function|Object} method the method being intercepted
 * @param {Function|Object} args the original args passed into the function being intercepted
**/
function Invocation(object, method, args) {

	assert(args, "Scarlet::Invocation::args == null");
	assert(object, "Scarlet::Invocation::object == null");
	assert(method, "Scarlet::Invocation::method == null");

	var self = this;

	self.args = args;

	self.object = object;
	self.method = method;
	self.result = null;

	/**
	 * Allows the intercepted method to be called
	 * 
	 * @category Invocation
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