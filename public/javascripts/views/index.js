define("views/index", 
	[
		"views/header",
		"views/navigation",
		"views/content",
		"views/footer",
		"views/editor"
	],
	function(Header, Navigation, Content, Footer, Editor) {
		return {
			Header: Header,
			Navigation: Navigation,
			Content: Content,
			Footer: Footer,
			Editor: Editor
		};
	});
