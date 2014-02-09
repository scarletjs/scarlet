define("library/content", function() {
	function Content(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.animate = function() {
			self.style
				.for(selector)
				.addClassDelay("animated fadeIn", 700);
		};
	}
	return Content;
});