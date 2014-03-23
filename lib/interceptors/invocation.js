var assert = require("assert");
var objectExt = require('../extensions/object');

function Invocation(context, method, args, proxyInfo) {

	"use strict";

	assert(method, "Scarlet::Invocation::method == null");

	var self = this;
	if(!args)
		args = [];

	if(!proxyInfo)
		proxyInfo = {};

	/**
	 * Information about the proxied object
	 * 
	 * @category Invocation Attributes
	 * @type {Object}
	 */
	self.proxyInfo = proxyInfo;

	/**
	 * Information about the type of the object being called
	 * 
	 * @category Invocation Attributes
	 * @type {Object}
	 */
	self.type = proxyInfo.type;
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
	self.method = method;

	/**
	 * Gets the name of the intercepted context
	 *
	 * @category Invocation Attributes
     * @type {String}
     */
	self.contextName = function(){
		if(proxyInfo.contextName)
			return proxyInfo.contextName;
		return objectExt.name(self.context);
	};

	/**
	 * Gets the name of the intercepted member
	 * 
	 * @category Invocation Attributes
     * @type {String}
     */
	self.memberName = function(){
		if(proxyInfo.memberName)
			return proxyInfo.memberName;
		return objectExt.name(self.method);
	};;

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
		self.result = self.method.apply(self.context, parameters);
		self.executionEndDate = new Date();

		return self.result;
	};
}

module.exports = Invocation;