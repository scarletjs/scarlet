define("views/header", function() {
	function Header(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.animateTitle = function(){
			self.style
				.for(selector)
				.and(".title")
				.css("opacity", "1")
				.addClass("animated fadeInLeft");
		};

		self.animateLinks = function(){
			self.style
				.for(selector)
				.and("#logo .contact i")
				.addClass("animated fadeInRight");
		};

		self.render = function() {
			self.animateTitle();
			self.animateLinks();
		};

	}
	return Header;
});
