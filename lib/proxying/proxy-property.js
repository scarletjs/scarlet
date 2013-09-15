var g = require("../../include");
var ext = require("../extensions");

function ProxyProperty(proxyInfo, whenCalled){

	var self = this;
	self.proxyInfo = proxyInfo;

	self.invokeWhenCalledForGet = function(){
		return whenCalled.call(self.proxyInfo.instance, self.proxyInfo, function(){
			return proxyInfo.instance.__scarlet[proxyInfo.memberName];
		});
	};

	self.invokeWhenCalledForSet = function(value){
		return whenCalled.call(self.proxyInfo.instance, self.proxyInfo, function(){
			proxyInfo.instance.__scarlet[proxyInfo.memberName] = value;
		});
	};

	self.wrap = function(){
		proxyInfo.instance.__scarlet[proxyInfo.memberName] = proxyInfo.instance[proxyInfo.memberName];
		Object.defineProperty(
			proxyInfo.instance, proxyInfo.memberName, {
				get: function(){
					return self.invokeWhenCalledForGet();
				},
				set: function(value){
					self.invokeWhenCalledForSet(value);
				}
			});
		return self;
	};

	self.unwrap = function(){
		delete proxyInfo.instance[proxyInfo.memberName];
		proxyInfo.instance[proxyInfo.memberName] = proxyInfo.instance.__scarlet[proxyInfo.memberName];
		delete proxyInfo.instance.__scarlet[proxyInfo.memberName];
		return self;
	};
}

module.exports = ProxyProperty;