function Series(){
	var self = this;

	self.targets = [];
	self.onDone = null;

	self.invoke = function(invocationArguments,onComplete) {
		
		var currentTarget  = 0;

		var next = function(error, result){
			
			if(currentTarget >= self.targets.length){

				onComplete();
				
				if(self.onDone)
					self.onDone.targetMethod.apply(self.onDone.targetThisContext,[invocationArguments]);

				return;
				
			}

			var targetMethod = self.targets[currentTarget];
			currentTarget++;
			targetCall(targetMethod);

			return;
		};

		var targetCall = function(target){
			target.targetMethod.apply(target.targetThisContext,[next,invocationArguments]);
		};

		next();

		return;
	}

	self.addTarget = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.targets.push(target);
	};

	self.addDone = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.onDone = target;
	};
}

module.exports = Series;