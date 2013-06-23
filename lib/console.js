function isObjectLiteral(_obj) {
	var _test = _obj;
	return (typeof _obj !== 'object' || _obj === null ?
		false :
		((function() {
			while (!false) {
				if (Object.getPrototypeOf(_test = Object.getPrototypeOf(_test)) === null) {
					break;
				}
			}
			return Object.getPrototypeOf(_obj) === _test;
		})()));
}

function getAllPropertyNames(obj) {
	var props = [];

	var getProperties = function(){
		Object.getOwnPropertyNames(obj).forEach(function(prop) {
			if (props.indexOf(prop) === -1) {
				props.push(prop);
			}
		});
	};

	var objectPrototype;
	do {
		getProperties();
		objectPrototype = Object.getPrototypeOf(obj);
	} while (objectPrototype);

	return props;
}

var names = getAllPropertyNames(new AnyObject());

for (var index = 0; index < names.length; index++) {
	console.log(names[index]);
}
