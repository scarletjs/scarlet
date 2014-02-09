define("library/navigation", function() {
	function Navigation(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.animate = function() {
			self.style
				.for(selector)
				.addClass("animated fadeInRightBig");
		};
	}
	return Navigation;
});