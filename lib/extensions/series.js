function Series(){
	var self = this;

	self.targets = [];
	self.onDone = null;

	self.invoke = function(invocation,onAllTargetsCalled) {
		var didComplete = false;

		self.callAllTargets(invocation,function(){
			if(!didComplete){
				onAllTargetsCalled();
				didComplete = true;
			}

			if(self.onDone)
				self.onDone.targetMethod.apply(self.onDone.targetThisContext,[invocation]);

		});

		if(!didComplete){
			onAllTargetsCalled();
			didComplete = true;
		}

		return;
	};

	self.callAllTargets = function(invocation,onComplete) {
		var currentTarget  = 0;

		var next = function(error, result){
			
			if(currentTarget >= self.targets.length){
				onComplete();
				return;				
			}

			var targetMethod = self.targets[currentTarget];
			currentTarget++;
			targetCall(targetMethod);

			return;
		};

		var targetCall = function(target){
			target.targetMethod.apply(target.targetThisContext,[next,invocation]);
		};

		next();
	};

	self.addTarget = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.targets.push(target);
	};

	self.addOnDone = function(targetMethod,targetThisContext){
		var target = {
			targetMethod : targetMethod,
			targetThisContext : targetThisContext
		};

		self.onDone = target;
	};
	
}

module.exports = Series;