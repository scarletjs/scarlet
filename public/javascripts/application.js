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

		function XGetElement(element) {

			var self = this;
			self.element = element;
			self.namespace = "x-get-";

			self.markAsVisited = function() {
				$(element).attr(self.namespace + "visited", "yes");
			};

			self.clearVisited = function() {
				$(element).attr(self.namespace + "visited", "no");
			};

			self.wasVisited = function() {
				return $(element).attr(self.namespace + "visited") == "yes";
			};

			self.getUri = function() {
				return $(element).attr(self.namespace + "uri");
			};

			self.getTarget = function() {
				return $(element).attr(self.namespace + "target");
			};

			self.execute = function(callback) {
				var uri = self.getUri();
				var target = self.getTarget();
				$.get(uri).done(function(html) {
					$(target).html(html);
					if (callback)
						callback(self);
				});
			};

			self.click = function(callback) {
				$(element).click(function() {
					if (callback) callback(self);
				});
			};

			self.query = function(){
				return $(element);
			};
		}

		function XGet() {

			var self = this;
			self.namespace = "x-get-";

			self.forEach = function(selector, callback) {
				$(selector).each(function(index, element) {
					var xgetElement = new XGetElement(element);
					if (!xgetElement.wasVisited()) {
						callback(xgetElement);
						xgetElement.markAsVisited();
					}
				});
			};
		}

		function XEvents() {

			var self = this;
			self.namespace = "x-event-";

			self.applyEvents = function() {

			};
		}

		var style = new Views.Style();

		var header = new Views.Header("#header", style);
		header.render();

		var navigation = new Views.Navigation("#navigation", style);
		navigation.render();

		var content = new Views.Content("#content", style);
		content.render();

		var footer = new Views.Footer("#footer", style);
		footer.render();

		function PartialViewFactory() {

			var editor = new Views.Editor("#editor", style);

			editor.addEventListener("execute", function(args) {
				var shell = new Interpreter.Shell();
				var result = shell.execute(args.text);
				$("#output").html(result);
			});

			editor.render();

			var navigationContainer = new Views.Panel("#navigationContainer", style);
			navigationContainer.render();

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

			new XGet().forEach("a[x-get-uri]", function(xgetElement) {
				xgetElement.click(function() {
					xgetElement.execute(function() {
						xgetElement.clearVisited();
						new PartialViewFactory();
					});
				});
			});

			new XGet().forEach("div[x-get-uri]", function(xgetElement) {
				xgetElement.execute(function() {
					new PartialViewFactory();
				});
			});
		}

		new XGet().forEach("a[x-get-uri]", function(xgetElement) {
			xgetElement.click(function() {
				xgetElement.execute(function() {
					xgetElement.clearVisited();
					new PartialViewFactory();
				});
			});
		});

		new XGet().forEach("div[x-get-uri]", function(xgetElement){
			xgetElement.execute(function() {
				new PartialViewFactory();
			});
		});

	});