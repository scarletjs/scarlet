define("views/index", 
	[
		"views/style",
		"views/header",
		"views/navigation",
		"views/content",
		"views/footer",
		"views/panel",
		"views/tile",
		"views/editor"
	],
	function(Style, Header, Navigation, Content, Footer, Panel, Tile, Editor) {
		return {
			Style: Style,
			Header: Header,
			Navigation: Navigation,
			Content: Content,
			Footer: Footer,
			Panel: Panel,
			Tile: Tile,
			Editor: Editor
		};
	});
