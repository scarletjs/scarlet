require("../include");

function Invocation(object, method, args, methodName, objectName) {
	
	"use strict";

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
	 * The result of the method being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Any}
	 */
	self.result = null;

	/**
	 * The method being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Function}
	 */
	self.method = method;

	/**
	 * Gets the name of the intercepted object
	 *
	 * @category Invocation Attributes
     * @type {String}
     */
	self.objectName = objectName;

	/**
	 * Gets the name of the intercepted method
	 * 
	 * @category Invocation Attributes
     * @type {String}
     */
	self.methodName = methodName;

	/**
	 * The start date time when the method was invoked
	 * 
	 * @category Invocation Attributes
	 * @type {Date}
	 */
	self.executionStartDate = null;

	/**
	 * The end date time when the method was invoked
	 * 
	 * @category Invocation Attributes
	 * @type {Date}
	 */
	self.executionEndDate = null;

	/**
	 * Calls the intercepted method
	 * 
	 * @category Invocation Attributes
     * @method proceed
     * @return Function|Object of the result of the original method call
     */
	self.proceed = function() {
		var parameters = Array.prototype.slice.call(args);
		self.executionStartDate = new Date();
		self.result = self.method.apply(self.object, parameters);
		self.executionEndDate = new Date();
		return self.result;
	};
}

module.exports = Invocation;