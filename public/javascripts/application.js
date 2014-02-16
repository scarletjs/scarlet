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
		"scarlet", 
		"dateformat"
	],
	function($, gf, jqg, sf, Views, Interpreter, Scarlet, DateFormat) {

		var style = new Views.Style();

		var header = new Views.Header("#header", style);
		header.render();

		var navigation = new Views.Navigation("#navigation", style);
		navigation.render();

		var content = new Views.Content("#content", style);
		content.render();

		var footer = new Views.Footer("#footer", style);
		footer.render();

		var editor = new Views.Editor("#editor", style);
		editor.addEventListener("execute", function(args){
			var shell = new Interpreter.Shell();
			var result = shell.execute(args.text);
			$("#output").html(result);
		});
		editor.render();

	});