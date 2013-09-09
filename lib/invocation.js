require("../include");

function Invocation(object, method, args, methodName, objectName) {
	
	"use strict";

	assert(method, "method == null");

	var self = this;

	/**
	 * The original arguments passed into the function being intercepted
	 * 
	 * @category Invocation Attributes
	 * @type {Object} - the argument object based into objects
	 */
	self.args = args;

	/**
	 * The result indicating if we have already invoked this invocation through proceed(...)
	 * 
	 * @category Invocation Attributes
	 * @type {Boolean} - true if proceed has been called
	 */
	self.executed = false;

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

	// Private methods

	var setExecuted = function(){
		self.executed = true;
	};

	var throwIfAlreadyExecuted = function(){
		if (self.executed) {
			var message = JSON.stringify(self);
			throw new Error("The following invocation has already been called:"+message);
		}
	};

	var replaceArguments = function(args){
		if(args.length > 0)
			self.args = args;
	};

	var stampStartDate = function(){
		self.executionStartDate = new Date();
	};

	var stampEndDate = function(){
		self.executionEndDate = new Date();
	};

	var beforeExecute = function(){
		stampStartDate();
	};

	var executeMethod = function() {
		throwIfAlreadyExecuted();
		self.result = self.method.apply(self.object, getParameters());
		return self.result;
	};

	var afterExecute = function(){
		stampEndDate();
	};

	var getParameters = function(){
		if (self.args)
			return Array.prototype.slice.call(self.args);
		return [];
	};

	// Public methods

	/**
	 * Calls the intercepted method
	 * 
	 * @category Invocation Attributes
     * @method proceed
     * @return Function|Object of the result of the original method call
     */
	self.proceed = function() {
		replaceArguments(arguments);
		beforeExecute();
		executeMethod();
		afterExecute();
		setExecuted();
		return self.result;
	};
}

module.exports = Invocation;