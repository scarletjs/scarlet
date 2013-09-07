function LinkedArray(){

	"use strict";

	var self = this;
	self.object = require("./object");
	self.enumerable = require("./enumerable");

	self.emptyNextGetter = function(){
		return null;
	};

	self.createNextGetter = function(element) {
		return function(){
			return element;
		};
	};

	self.createNext = function(currentElement, nextElementGetter){
		if (self.object.isNull(nextElementGetter))
			nextElementGetter = self.emptyNextGetter;
		currentElement.next = nextElementGetter;
		return currentElement;
	};

	self.build = function(array){
		var first = null;
		var current = null;
		var previous = null;
		self.enumerable.forEach(array, function(element){
			if (self.object.isNull(first)) {
				first = self.createNext(element);
				current = first;
			} else {
				current = self.createNext(element);
				previous.next = self.createNextGetter(current);
			}		
			previous = current;
		});
		return first;
	};

};

module.exports = new LinkedArray();