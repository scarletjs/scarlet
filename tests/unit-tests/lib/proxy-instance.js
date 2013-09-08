require("../../../include");

describe("Given /lib/ProxyInstance", function(){

	var ProxyInstance = require("../../../lib/proxy-instance");

	describe("When #whenCalled()", function(){

		function AnyClass(){
			var self = this;
			self.anyMethod = function(arg1, arg2, arg3){
				return 9;
			};
		}

		var instance = new AnyClass();
		var proxyInstance = new ProxyInstance(instance);

		it("Then callback when a member is called on the instance", function(){
			var _args = null;
			var _instance = null;
			var _memberName = null;
			
			proxyInstance.whenCalled(function(instance, member, args, memberName){
				_args = args;
				_instance = instance;
				_memberName = memberName;
				return member.call(instance, args);
			});
			
			var result = instance.anyMethod("apple", "pear", "banana");
			assert(result === 9);
			assert(_args.length === 3);
			assert(_args[0] === "apple");
			assert(_args[1] === "pear");
			assert(_args[2] === "banana");
		});

	});

});