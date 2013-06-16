function PrototypeFunction(){
	console.log("PrototypeFunction::ctor");
}

PrototypeFunction.prototype.property = "";

PrototypeFunction.prototype.method = function(){
	console.log("PrototypeFunction::method");
};

PrototypeFunction.prototype.methodWithReturn = function(){
	return "any";
};


module.exports = PrototypeFunction;