var g = require("../../include");

function Registry(){

	"use strict";

	var self = this;
	self.interceptors = [];
	
	self.intercept = function(target){
		return self;
	};

	self.with = function(interceptor){
		return self;
	};
}

function Interceptor(){

	"use strict";

	var self = this;
	self.registry = new Registry();
}

module.exports = Interceptor;