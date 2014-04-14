var assert = require("assert");

function Enumerable() {

	"use strict";

	var self = this;
	self.__typename__ = "scarlet.lib.extensions.Enumerable";

	self.arrayFor = function(array, callback) {
		for (var i = 0; i < array.length; i++) {
			callback(array[i], i, array);
		}
	};

	self.funcFor = function(object, callback) {
		for (var key in object) {
			callback(object[key], key, object);
		}
	};

	self.stringFor = function(string, callback) {
		self.arrayFor(string.split(""), function(chr, index) {
			callback(chr, index, string);
		});
	};

	self.allEach = function(object, callback) {
		Object.getOwnPropertyNames(object).forEach(function(property) {
			callback(object[property], property, object);
		});
	};

	self.forEach = function(object, callback) {
		if (object) {
			var resolve = self.funcFor;
			if (object instanceof Function) {
				resolve = self.funcFor;
			} else if (typeof object == "string") {
				resolve = self.stringFor;
			} else if (typeof object.length == "number") {
				resolve = self.arrayFor;
			}
			resolve(object, callback);
		}
	};
	self.any = function(object, predicateCallback) {
		var isTrue = false;
		self.forEach(object, function(element, index) {
			if (!predicateCallback(element, index))
				return;
			isTrue = true;
			return;
		});
		return isTrue;
	};
	self.where = function(object, predicateCallback) {
		var results = [];
		self.forEach(object, function(element) {
			if (predicateCallback(element))
				results.push(element);
		});
		return results;
	};

	self.first = function(object, predicateCallback) {
		if (typeof(predicateCallback) == "undefined" && typeof(object) != "undefined" && object.length > 0) {
			return object[0];
		}
		var results = self.where(object, predicateCallback);
		if (results.length > 0)
			return results[0];
		return null;
	};

	self.mapSeries = function(functions, onEach, onComplete) {
		assert(typeof functions.length === "number", "Object to map must be an array");

		if (!this)
			return new self.mapSeries(functions, onEach, onComplete);

		var results = [];
		var thisContext = this;
		var functionNumber = 0;

		var next = function() {
			var nextfunction = functions[functionNumber];
			functionNumber++;
			return nextfunction;
		};

		var finalResult = null;

		thisContext._proceed = function(error, result) {
			if (result !== undefined)
				results.push(result);
			var nextfunction = next();
			if (nextfunction)
				onEach(error, nextfunction, thisContext._proceed);
			else if (onComplete)
				finalResult = onComplete(error, results);
			return finalResult;
		};

		thisContext._proceed();
	};
}

module.exports = new Enumerable();