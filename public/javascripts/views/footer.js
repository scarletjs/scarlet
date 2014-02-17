define("views/footer", function() {
	function Footer(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.render = function() {
			/*self.style
				.for (selector)
				.css("opacity", "1")
				.addClass("animated fadeInUpBig");*/
		};

	}
	return Footer;
});