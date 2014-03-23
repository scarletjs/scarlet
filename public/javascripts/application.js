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
		"scarlet": "vendor/scarlet/scarlet"
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

			new Library.XScroll("[x-type='x-scroll']")
				.render();

			new Library.XLinks(document)
				.render("[x-type='x-links']");

			new Library.XPanel("[x-type='x-panel']")
				.render();

			new Library.XPanel("[x-type='x-editor']")
				.render();

			new Library.XPanel("[x-type='x-output']")
				.render();

			var editors = new Library.XEditor("[x-type='x-editor']");
			editors.render();

			var outputs = new Library.XOutput("[x-type='x-output']");
			outputs.render();

			editors.addListener(function(args){
				var $editorElement = $("#" + args.self.id);
				var result = new Interpreter.Shell().execute(args.text);
				var outputSelector = $editorElement.attr("x-output");
				outputs.render(outputSelector, result);
			});

			editors.fireEvents();

			new Library.XGet("a[x-get-uri]", "get-uri-click-visited")
				.forEach(function(xgetElement) {
					xgetElement.click(function() {
						xgetElement.executeGet(function() {
							xgetElement.clearVisited();
							new ViewFactory();
						});
					});
				});

			new Library.XGet("div[x-get-uri]", "get-uri-now-visited")
				.forEach(function(xgetElement) {
					xgetElement.executeGet(function() {
						new ViewFactory();
					});
				});

			style
				.for("#rightContainer")
				.addClassDelay("animated fadeInRight");
		}

		new ViewFactory();

	});