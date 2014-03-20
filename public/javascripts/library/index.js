define("library/index", 
	[
		"library/x-get",
		"library/x-panel",
		"library/x-size",
		"library/x-style"
	], 
	function(XGet, XPanel, XSize, XStyle) {
		return {
			XGet: XGet,
			XPanel: XPanel,
			XSize: XSize,
			XStyle: XStyle
		};
	});