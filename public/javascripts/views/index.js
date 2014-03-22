define("views/index", 
	[
		"views/header",
		"views/navigation",
		"views/content",
		"views/footer"
	],
	function(Header, Navigation, Content, Footer) {
		return {
			Header: Header,
			Navigation: Navigation,
			Content: Content,
			Footer: Footer
		};
	});
