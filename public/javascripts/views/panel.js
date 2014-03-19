define("views/panel", function() {
	function Panel(selector, style) {

		var self = this;
		self.style = style.getInstance();

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		self.render = function(){
			var results = $(selector);
			
			if (results.length === 0)
				return;

			var element = $(results[0]);
			var top = $(element).attr("x-top");
			if (isDefined(top)) $(element).css("top", top);
			var right = $(element).attr("x-right");
			if (isDefined(right)) $(element).css("right", right);
			var left = $(element).attr("x-left");
			if (isDefined(left)) $(element).css("left", left);
			var bottom = $(element).attr("x-bottom");
			if (isDefined(bottom)) $(element).css("bottom", bottom);
			var width = $(element).attr("x-width");
			if (isDefined(width)) $(element).css("width", width);
			var height = $(element).attr("x-height");
			if (isDefined(height)) $(element).css("height", height);
		}

	}
	return Panel;
});
