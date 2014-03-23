var assert = require('assert');
var ProxyInfo = require('./proxy-info');

function ProxyProperty(proxyInfo,whenCalled) {

	"use strict";

	assert(proxyInfo);
	assert(whenCalled);

	var self = this;
	var propertyName = proxyInfo.memberName;
	var properyThisContext = proxyInfo.instanceOrType;
	self.__typename__ = "scarlet.lib.proxies.ProxyProperty";

	var invokeWhenCalledForGet = function() {
		return whenCalled.call(
			properyThisContext,
			function() {
				return properyThisContext.__scarlet__[propertyName];
			},
			null,
			proxyInfo);
	};

	var invokeWhenCalledForSet = function(value) {
		return whenCalled.call(
			properyThisContext,
			function() {
				properyThisContext.__scarlet__[propertyName] = value;
			},
			null,
			proxyInfo);
	};

	self.wrap = function() {
		properyThisContext.__scarlet__[propertyName] = properyThisContext[propertyName];
		Object.defineProperty(
			properyThisContext, 
			propertyName, 
			{
				get: function() {
					return invokeWhenCalledForGet();
				},
				set: function(value) {
					invokeWhenCalledForSet(value);
				}
			});
		return self;
	};

	self.unwrap = function() {
		properyThisContext[propertyName] = properyThisContext.__scarlet__[propertyName];
		delete properyThisContext.__scarlet__[propertyName];
		return self;
	};
}

module.exports = ProxyProperty;