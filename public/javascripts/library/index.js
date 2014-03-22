define("library/index", 
	[
		"library/x-get",
		"library/x-panel",
		"library/x-size",
		"library/x-style",
		"library/x-links",
		"library/x-scroll",
		"library/x-editor",
		"library/x-output"
	], 
	function(XGet, XPanel, XSize, XStyle, XLinks, XScroll, XEditor, XOutput) {
		return {
			XGet: XGet,
			XPanel: XPanel,
			XSize: XSize,
			XStyle: XStyle,
			XLinks: XLinks,
			XScroll: XScroll,
			XEditor: XEditor,
			XOutput: XOutput
		};
	});