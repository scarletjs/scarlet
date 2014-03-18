define("views/style", function() {
	function Style() {

		var self = this;
		self.childSelector = null;
		self.parentSelector = null;

		var getSelector = function(){
			if (self.childSelector == null)
				return self.parentSelector;
			return "{0} {1}".format(
				self.parentSelector,
				self.childSelector);
		};

		self.getInstance = function(){
			return new Style();
		};

		self.for = function(parentSelector){
			self.childSelector = null;
			self.parentSelector = parentSelector;
			return self;
		};

		self.css = function(name, value) {
			$(getSelector()).css(name, value);
			return self;
		};

		self.cssDelay = function(name, value, delay) {
			var currentSelector = getSelector();
			setTimeout(function() {
				$(currentSelector).css(name, value);
			}, delay);
			return self;
		};

		self.and = function(childSelector){
			self.childSelector = childSelector;
			return self;
		};

		self.addClass = function(className){
			$(getSelector()).addClass(className);
			return self;
		};

		self.removeClass = function(className) {
			$(getSelector()).removeClass(className);
			return self;
		};

		self.addClassDelay = function(className, delay) {
			var currentSelector = getSelector();
			setTimeout(function() {
				$(currentSelector).addClass(className);
			}, delay);
			return self;
		};

		self.removeClassDelay = function(className, delay) {
			var currentSelector = getSelector();
			setTimeout(function() {
				$(currentSelector).removeClass(className);
			}, delay);
			return self;
		};
	}
	return Style;
});
