function Series() {

	"use strict";

	var self = this;
	self.targets = [];
	self.onDone = null;

	self.invokeAsync = function(parameters, onAllTargetsCalled) {
		self.callAllTargets(parameters, function() {
			if (onAllTargetsCalled)
				onAllTargetsCalled();
			if (self.onDone)
				self.onDone.targetMethod.apply(self.onDone.targetThisContext, [parameters]);
		});
	};

	self.invoke = function(parameters, onAllTargetsCalled) {
		var didComplete = false;
		self.callAllTargets(parameters, function() {
			if (!didComplete) {
				onAllTargetsCalled();
				didComplete = true;
			}
			if (self.onDone)
				self.onDone.targetMethod.apply(self.onDone.targetThisContext, [parameters]);
			return;
		});
		if (!didComplete) {
			onAllTargetsCalled();
			didComplete = true;
		}
		return;
	};

	self.callAllTargets = function(parameters, onComplete) {
		var currentTarget = 0;
		var next = function(error, result) {
			if (currentTarget >= self.targets.length)
				return onComplete();
			var targetMethod = self.targets[currentTarget];
			currentTarget++;
			targetCall(targetMethod);
			return;
		};
		var targetCall = function(target) {
			target.targetMethod.apply(target.targetThisContext, [next, parameters]);
		};
		next();
	};

	self.addTarget = function(targetMethod, targetThisContext) {
		var target = {
			targetMethod: targetMethod,
			targetThisContext: targetThisContext
		};
		self.targets.push(target);
	};

	self.addOnDone = function(targetMethod, targetThisContext) {
		var target = {
			targetMethod: targetMethod,
			targetThisContext: targetThisContext
		};
		self.onDone = target;
	};

}

module.exports = new Series();