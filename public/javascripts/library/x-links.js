define("library/x-links", ["lodash", "jquery", "library/x-get"], function(_, $, XGet) {
	function XLinks(selector) {

		var self = this;

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		self.render = function(targetSelector){
			var result = $("<ul class='index-med'></ul>");
			console.log("XLinks::render for " + selector);

			$(selector).find("a[name]").each(function(index, element){
				console.log("XLinks::render applying to " + targetSelector);
				var $element = $(element);
				var text = $element.text();
				var name = $element.attr("name");
				if (typeof(name) != "undefined") {
					console.log("XLinks::render found " + name + " with text " + text);
					result.append("<li><a href=#" + name + ">" + text + "</a></li>");
				}
				$(targetSelector).html(result);
			});
		};

	}
	return XLinks;
});
