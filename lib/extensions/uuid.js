function Uuid(){

	"use strict";

	var self = this;

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
	}

	function guid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
	}

	this.next = function(){
		return guid();
	};
}

module.exports = new Uuid();

