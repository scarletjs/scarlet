var g = require("../../include");

function Invocation(whenCalled){

	"use strict";

	var self = this;

	self.invoke = function(info, args){
		g.ll("*** -> invoke");
		return whenCalled.call(this, info, method, args);
	};
};

function Interceptor(){

	"use strict";

	var ProxyInterceptor = require("../proxies/proxy-interceptor");

	var self = this;
	self.proxy = null;
	self.interceptors = [];

	var whenProxyCalled = function(info, method, args){
		g.assert(self.interceptors.length > 0, "Please make sure you add an interceptor");

		var thisContext = this;
		var previousCallback = null;
		var previousInterceptor = null;

		g.ext.enumerable.forEach(self.interceptors, function(interceptor, index){
			previousCallback = (function(_previousInterceptor, _previousCallback, _info, _thisContext, _method, _args){
				var currentCallback = null;
				if (_previousCallback == null && _previousInterceptor == null) {
					currentCallback = function(__info, __method, __args){
						return _method.apply(_thisContext, __args);
					};
				} else {
					currentCallback = function(__info, __method, __args) {
						return _previousInterceptor.call(_thisContext, __info, _previousCallback, __args);	
					};
				}
				return currentCallback;
			})(previousInterceptor, previousCallback, info, thisContext, method, args);
			previousInterceptor = interceptor;
		});

		return previousInterceptor.call(thisContext, info, previousCallback, args);
	};

	self.intercept = function(typeOrInstance, replaceTypeCallback) {
		self.proxy = new ProxyInterceptor(typeOrInstance);
		self.proxy.intercept(whenProxyCalled, replaceTypeCallback);
		return self;
	};

	self.using = function(whenCalled) {
		g.assert(self.proxy, "Please make sure you are intercepting something first");
		self.interceptors.push(whenCalled);
		return self;
	};
}

module.exports = Interceptor;