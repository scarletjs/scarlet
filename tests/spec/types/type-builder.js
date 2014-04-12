var dummies = require("./dummies");
var logger = require("../../../lib/extensions/logger");
var TypeAssertionBuilder = require("./type-assertion-builder");

module.exports = function TypeBuilder(scarlet){

	var self = this;

	self.instances = [];
	this.typeAssertionBuilder = new TypeAssertionBuilder();

	self.withNamedFunction = function(){
		var instance = new dummies.NamedFunc(self);
		logger.info(TypeBuilder, "withNamedFunction", "Creating Named Function", [instance]);
		var reset = function(){
			var resetInstance = new dummies.NamedFunc();
			resetInstance.reset = reset;
			return resetInstance;
		};
		instance.reset = reset;
		self.instances.push(instance);
		return self;
	};

	self.withObjectLiteral = function(){
		var instance = dummies.ObjectLiteral(self);
		logger.info(TypeBuilder, "withObjectLiteral", "Creating Object Literal", [instance]);
		instance.reset = function(){
			return dummies.ObjectLiteral(self);
		};
		var reset = function(){
			var resetInstance = dummies.ObjectLiteral(self);
			resetInstance.reset = reset;
			return resetInstance;
		};
		instance.reset = reset;
		self.instances.push(instance);
		return self;
	};

	self.withPrototypeFunction = function(){
		var instance = new dummies.PrototypeFunc(self);
		logger.info(TypeBuilder, "withPrototypeFunction", "Creating Prototype Function", [instance]);

		var reset = function(){
			var resetInstance = new dummies.PrototypeFunc();
			resetInstance.reset = reset;
			return resetInstance;
		};
		instance.reset = reset;
		self.instances.push(instance);
		return self;
	};

	self.withUnamedFunction = function(){
		var instance = new dummies.UnnamedFunc(self);
		var reset = function(){
			var resetInstance = new dummies.UnnamedFunc();
			resetInstance.reset = reset;
			return resetInstance;
		};
		instance.reset = reset;
		logger.info(TypeBuilder, "withUnamedFunction", "Creating Unamed Function", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withAllInstanceTypes = function(){
		self.withNamedFunction();
		self.withObjectLiteral();
		self.withUnamedFunction();
		self.withPrototypeFunction();

		return self;
	};
};