define("views/content", function() {
	function Content(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.render = function() {
			self.style
				.for(selector)
				.addClassDelay("animated fadeIn", 200);
		};
	}
	return Content;
});