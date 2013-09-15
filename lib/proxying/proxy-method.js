var g = require("../include");
var ext = require("./extensions");

function ProxyMethod(proxyInfo, whenCalled){

	var self = this;

	self.wrap = function(){
		proxyInfo.instance[memberName]
	};

	self.unwrap = function(){

	};

}

module.exports = ProxyMethod;