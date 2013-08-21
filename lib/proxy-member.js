var enumerable = require("./extensions/enumerable");


function ProxyMember(instance, memberName) {

	var self = this;

	self.instance = instance;

	if(!instance.__scarlet)
		instance.__scarlet = {};

	self.whenCalled = function(target) {

		instance.__scarlet[memberName] = instance[memberName];

		createPropertyProxy(instance[memberName], memberName, target);

		createFunctionProxy(instance[memberName], memberName, target);

		return instance;

	};

	var createPropertyProxy = function(member,memberName,target){
		if (instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName !== "__scarlet") && (memberName !== "__typename")) {

			instance[memberName] = Object.defineProperty(interceptor.instance, memberName, {

				configurable: true,

				get: function(){
					return target(function(){
						return instance.__scarlet[memberName];
					}, instance.__scarlet[memberName]);
				},
				
				set: function(value){
					target(function(){
						instance.__scarlet[memberName] = value;	
					}, value);
				}
				
			});
		} else if (instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName === "__typename")) {
			instance.__typename = instance.__scarlet.__typename;
		}
	};

	var createFunctionProxy = function(member,memberName,target){
		if (member instanceof(Function)) {
			var originalMethod = instance.__scarlet[memberName];
			
			instance[memberName] = function() {
				return target(originalMethod, arguments);
			};
		}
	};

	self.unwrap = function() {

		if (instance.__scarlet) {

			enumerable.forEach(instance, function(member, memberName) {

				if (member instanceof Function) {
					var originalMethod = instance.__scarlet[memberName];
					instance[memberName] = originalMethod;
				}

			});
		}

	};

}

module.exports = ProxyMember;