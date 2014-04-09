var dummies = require("./dummies");
var logger = require("../../../lib/extensions/logger");
var TypeAssertionBuilder = require("./type-assertion-builder");

module.exports = function TypeBuilder(scarlet){

	var self = this;

	self.instances = [];
	this.typeAssertionBuilder = new TypeAssertionBuilder();

	self.withNamedFunction = function(){
		var instance = new dummies.NamedFunc(self);
		this.typeAssertionBuilder.withType(instance);
		logger.info(TypeBuilder, "withNamedFunction", "Creating Named Function", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withObjectLiteral = function(){
		var instance = dummies.ObjectLiteral(self);
		this.typeAssertionBuilder.withType(instance);
		logger.info(TypeBuilder, "withObjectLiteral", "Creating Object Literal", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withPrototypeFunction = function(){
		var instance = new dummies.PrototypeFunc(self);
		this.typeAssertionBuilder.withType(instance);
		logger.info(TypeBuilder, "withPrototypeFunction", "Creating Prototype Function", [instance]);
		self.instances.push(instance);
		return self;
	};

	self.withUnamedFunction = function(){
		var instance = new dummies.UnnamedFunc(self);
		this.typeAssertionBuilder.withType(instance);
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