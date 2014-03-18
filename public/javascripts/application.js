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

		function PartialViewFactory(){

			var editor = new Views.Editor("#editor", style);

			editor.addEventListener("execute", function(args){
				var shell = new Interpreter.Shell();
				var result = shell.execute(args.text);
				$("#output").html(result);
			});

			editor.render();

			var editor = new Views.Panel("#editorContainer", style);
			editor.render();

			var editorTitle = new Views.Panel("#editorContainer #editorTitle", style);
			editorTitle.render();

			var output = new Views.Panel("#outputContainer", style);
			output.render();

			var outputTitle = new Views.Panel("#outputContainer #outputTitle", style);
			outputTitle.render();

			var helpWalkthroughs = new Views.Panel("#helpWalkthroughContainer", style);
			helpWalkthroughs.render();

			var helpWalkthroughTitle = new Views.Panel("#helpWalkthroughContainer #helpWalkthroughTitle", style);
			helpWalkthroughTitle.render();

			$("a[x-get-uri]").each(function(index, element){
				var $element = $(element);
				var uri = $element.attr("x-get-uri");
				var selector = $element.attr("x-get-target");
				$element.click(function(){
					console.log(uri);
					$.get(uri).done(function(partial){
						console.log(partial);
						$(selector).html(partial);
						new PartialViewFactory();
					});
				});
			});

		}


		$("[x-get-uri]").each(function(index, element){
			var $element = $(element);
			var uri = $element.attr("x-get-uri");
			var selector = $element.attr("x-get-target");
			$.get(uri).done(function(partial){
				$(selector).html(partial);
				new PartialViewFactory();
			});
		});


});
