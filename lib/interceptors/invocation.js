var assert = require("assert");
var objectExt = require("../extensions/object");

module.exports = function Invocation(context, invocationName, invocationMethod, args) {
	"use strict";

	assert(invocationMethod, "invocationMethod == null");

	var self = this;
	
	if (!args)
		args = [];

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
	self.context = context;

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
	self.method = invocationMethod;

	/**
	 * Gets the name of the intercepted context
	 *
	 * @category Invocation Attributes
	 * @type {String}
	 */
	self.contextName = function() {
		return objectExt.name(self.context);
	};

	/**
	 * Gets the name of the intercepted member
	 *
	 * @category Invocation Attributes
	 * @type {String}
	 */
	self.memberName = function() {
		if (invocationName)
			return invocationName;
		return objectExt.name(self.method);
	};

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
		var parameters = Array.prototype.slice.call(self.args);
		self.executionStartDate = new Date();
		self.result = self.method.apply(self.context, parameters);
		self.executionEndDate = new Date();
		return self.result;
	};
};