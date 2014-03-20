require.config({
	baseUrl: "javascripts",
	paths: {
		"ace": "vendor/ace/lib/ace",
		"lodash": "vendor/lodash",
		"jquery": "vendor/jquery",
		"dateformat": "vendor/date-format",
		"jquery.gridify": "vendor/gridify",
		"jquery.jqgrid": "vendor/jqgrid/js/jquery.jqGrid.min",
		"stringformat": "vendor/string-format",
		"scarlet": "https://raw2.github.com/scarletjs/scarlet/master/pub/scarlet"
	},
	shim: {
		"jquery.gridify": {
			deps: ["jquery"],
			exports: "jQuery.fn.gridify"
		},
		"jquery.jqgrid": {
			deps: ["jquery"],
			exports: "jQuery.fn.jqGrid"
		}
	}
});

require([
		"jquery",
		"jquery.gridify",
		"jquery.jqgrid",
		"stringformat",
		"views/index",
		"interpreter/index",
		"library/index",
		"scarlet",
		"dateformat"
	],
	function($, gf, jqg, sf, Views, Interpreter, Library, Scarlet, DateFormat) {

		var style = new Library.XStyle();

		var header = new Views.Header("#header", style);
		header.render();

		var navigation = new Views.Navigation("#navigation", style);
		navigation.render();

		var content = new Views.Content("#content", style);
		content.render();

		var footer = new Views.Footer("#footer", style);
		footer.render();

		function ViewFactory() {

			var editor = new Views.Editor("#editor", style);
			editor.addEventListener("execute", function(args) {
				var shell = new Interpreter.Shell();
				var result = shell.execute(args.text);
				$("#output").html(result);
			});
			editor.render();

			new Library.XPanel("[x-type='x-panel']")
				.render();

			new Library.XGet("a[x-get-uri]")
				.forEach(function(xgetElement) {
					xgetElement.click(function() {
						xgetElement.executeGet(function() {
							xgetElement.clearVisited();
							new ViewFactory();
						});
					});
				});

			new Library.XGet("div[x-get-uri]")
				.forEach(function(xgetElement) {
					xgetElement.executeGet(function() {
						new ViewFactory();
					});
				});
		}

		new ViewFactory();

	});