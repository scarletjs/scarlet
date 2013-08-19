var enumerable = require("./extensions/enumerable");


function ProxyInstance(interceptor) {

	var self = this;

	self.interceptor = interceptor;

	self.whenCalled = function(target) {
		if (!interceptor.instance.__scarlet) {

			interceptor.instance.__scarlet = {};

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				self.interceptor.instance.__scarlet[memberName] = self.interceptor.instance[memberName];

				createPropertyProxy(member, memberName, target);

				createFunctionProxy(member, memberName, target);

			});
		}

		return interceptor.instance;
	};

	var createPropertyProxy = function(member,memberName,target){
		if (interceptor.instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName !== "__scarlet") && (memberName !== "__typename")) {

			self.interceptor.instance[memberName] = Object.defineProperty(interceptor.instance, memberName, {

				configurable: true,

				get: function(){
					return target(function(){
						return self.interceptor.instance.__scarlet[memberName];
					}, self.interceptor.instance.__scarlet[memberName]);
				},
				
				set: function(value){
					target(function(){
						self.interceptor.instance.__scarlet[memberName] = value;	
					}, value);
				}
				
			});
		} else if (interceptor.instance.hasOwnProperty(memberName) && !(member instanceof(Function)) && (memberName === "__typename")) {
			self.interceptor.instance.__typename = self.interceptor.instance.__scarlet.__typename;
		}
	};

	var createFunctionProxy = function(member,memberName,target){
		if (member instanceof(Function)) {
			var originalMethod = self.interceptor.instance.__scarlet[memberName];
			
			self.interceptor.instance[memberName] = function() {
				return target(originalMethod, arguments);
			};

		}
	};

	self.unwrap = function() {

		if (interceptor.instance.__scarlet) {

			enumerable.forEach(interceptor.instance, function(member, memberName) {

				if (member instanceof Function) {
					var originalMethod = interceptor.instance.__scarlet[memberName];
					interceptor.instance[memberName] = originalMethod;
				}

			});
		}

	};

}

module.exports = ProxyInstance;