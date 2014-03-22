define("library/x-links", ["lodash", "jquery"], function(_, $) {
	function XLinks(selector) {

		var self = this;

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		self.render = function(targetSelector){
			var result = $("<ul class='index-med'></ul>");
			console.log("XLinks::render for " + selector);
			$(selector).find("a[name]").each(function(index, element){
				var text = $(element).text();
				var name = $(element).attr("name");
				console.log("XLinks::render found " + name + " with text " + text);
				result.append("<li><a href=#" + name + ">" + text + "</a></li>");
			});
			console.log("XLinks::render applying to " + targetSelector);
			$(targetSelector).html(result);
		};

	}
	return XLinks;
});
