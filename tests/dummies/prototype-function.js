function PrototypeFunction(){
	this.anyInstanceProperty = "AnyInstanceProperty";
}

PrototypeFunction.prototype.property = "";

PrototypeFunction.prototype.method = function(){
};

PrototypeFunction.prototype.methodUsingInstanceProperty = function(){
	return this.anyInstanceProperty;
};

PrototypeFunction.prototype.methodWithReturn = function(){
	return "any";
};


module.exports = PrototypeFunction;