var assert = require('assert');

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

	self.where = function(object, predicateCallback) {
		var results = [];
		self.forEach(object, function(element){
			if (predicateCallback(element))
				results.push(element);			
		});
		return results;
	};

	self.first = function(object, predicateCallback) {
		if (typeof(predicateCallback) == "undefined" && typeof(object) != "undefined" && object.length > 0){
			return object[0];
		};
		var results = self.where(object, predicateCallback);
		if (results.length > 0)
			return results[0];
		return null;
	};

	self.chained = function (functions,onEach){
		var functionNumber = 0;
		assert(typeof functions.length === "number", "Object to chain must be an array");
		var next = function(){
			var nextfunction= functions[functionNumber];
			functionNumber++;
			return nextfunction;
		};
		this.proceed = function(){
			var nextfunction = next();
			return onEach(nextfunction);
		};
	};
};

module.exports = new Enumerable();