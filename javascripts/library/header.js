define("library/header", function() {
	function Header(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.animateTitle = function(){
			self.style
				.for(selector)
				.and(".title")
				.css("opacity", "1")
				.addClass("animated fadeInLeftBig");
		};

		self.animateLinks = function(){
			self.style
				.for(selector)
				.and("#logo .contact i")
				.addClass("animated fadeInLeftBig");
		};

		self.animate = function() {
			self.animateTitle();
			self.animateLinks();
		};

	}
	return Header;
});