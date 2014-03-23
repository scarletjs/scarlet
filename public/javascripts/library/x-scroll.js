define("library/x-scroll", ["lodash", "jquery"], function(_, $) {
	function XScroll(selector) {

		var self = this;

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		self.render = function(){
			console.log("XScroll::render x-scroll " + selector);
			console.log("XScroll::render x-scroll disabled");
			return;
			new XGet(selector, "scroll-visited")
				.forEach(function(xgetElement) {
					var element = xgetElement.element;
					console.log("XScroll::render x-scroll " + $(element).html());
					var offset = $(element).offset();
					console.log(offset);
					var leftInit = $(element).offset().left;
					var top = $(element).offset().top - parseFloat($(element).css("margin-top").replace(/auto/, 0));
					$(window).scroll(function(event) {
					    var x = 0 - $(this).scrollLeft();
					    var y = $(this).scrollTop();
					    if (y >= top) {
					        $(element).addClass("fixed");
					    } else {
					        $(element).removeClass("fixed");
					    }
					    $(element).offset({
					        left: x + leftInit
					    });
					});
				});
		};

	}
	return XScroll;
});
