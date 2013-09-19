function LinkedArray() {

	"use strict";

	var self = this;
	var object = require("./object");
	var enumerable = require("./enumerable");

	self.emptyNextGetter = function() {
		return null;
	};

	self.createNextGetter = function(element) {
		return function() {
			return element;
		};
	};

	self.createNext = function(currentElement, nextElementGetter) {
		if (object.isNull(nextElementGetter))
			nextElementGetter = self.emptyNextGetter;
		currentElement.next = nextElementGetter;
		return currentElement;
	};

	self.processElement = function(chain, element){
		if (object.isNull(chain.first)) {
			chain.first = self.createNext(element);
			chain.current = chain.first;
		} else {
			chain.current = self.createNext(element);
			chain.previous.next = self.createNextGetter(chain.current);
		}
		chain.previous = chain.current;
	};

	self.build = function(array, forEach) {
		var chain = {
			first: null,
			current: null,
			previous: null
		}
		enumerable.forEach(array, function(element) {
			self.processElement(chain, element);
			if(!object.isNull(forEach))
				forEach(element);
		});
		return chain.first;
	};

};

module.exports = new LinkedArray();