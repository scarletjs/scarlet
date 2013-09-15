var g = require("../include");
var ext = require("./extensions");



function Proxy(instance, member, memberName, whenCalled){

	var self = this;
	self.info = new ProxyInfo(instance, memberName);

	if (object.isNull(instance.__scarlet))
		instance.__scarlet = {};

	self.getPropertyDelegate = function() {
		return function(){
			return instance.__scarlet[memberName];
		};
	};

	self.setPropertyDelegate = function(value){
		return function(){
			instance.__scarlet[memberName] = value;
		};
	};

	self.getPropertyWithCallback = function(){
		return whenCalled(
			instance, 
			instance[memberName]);
	};

	self.wrapProperty = function(){
		Object.defineProperty(instance, memberName, {
			configurable: true,
			get: function() {
				return whenCalled(instance, function() {
					return instance.__scarlet[memberName];
				}, instance.__scarlet[memberName], memberName);
			},
			set: function(value) {
				whenCalled(instance, function() {
					instance.__scarlet[memberName] = value;
				}, value, memberName);
			}
		});
	};

	self.unwrapProperty = function(){

	};

	self.wrapFunction = function(){

	};

	self.unwrapFunction = function(){

	};

}

module.exports = Proxy;