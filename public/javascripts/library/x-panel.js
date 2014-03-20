define("library/x-panel", ["lodash", "jquery"], function(_, $) {
	function XPanel(selector) {

		var self = this;

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		var applyToElement = function(attributeName, asAttributeName, $element){
			var value = $element.attr(attributeName);
			if(isDefined(value)) {
				$element.css(asAttributeName, value);
				console.log("XPanel::Applying " + attributeName + "(" + value + ") as '" + asAttributeName + "'' to #" + $element.attr("id"));
			}
		};

		self.render = function(){
			console.log("XPanel::Apply x-panel render() for " + selector);
			$(selector).each(function(index, element){
				applyToElement("x-top", "top", $(element));
				applyToElement("x-rig", "right", $(element));
				applyToElement("x-righ", "right", $(element));
				applyToElement("x-right", "right", $(element));
				applyToElement("x-lef", "left", $(element));
				applyToElement("x-left", "left", $(element));
				applyToElement("x-bot", "bottom", $(element));
				applyToElement("x-bott", "bottom", $(element));
				applyToElement("x-bottom", "bottom", $(element));
				applyToElement("x-wid", "width", $(element));
				applyToElement("x-widt", "width", $(element));
				applyToElement("x-width", "width", $(element));
				applyToElement("x-hei", "height", $(element));
				applyToElement("x-heig", "height", $(element));
				applyToElement("x-height", "height", $(element));
				applyToElement("x-pos", "position", $(element));
				applyToElement("x-posi", "position", $(element));
				applyToElement("x-position", "position", $(element));
				applyToElement("x-pad", "padding", $(element));
				applyToElement("x-padd", "padding", $(element));
				applyToElement("x-padding", "padding", $(element));
				applyToElement("x-mar", "margin", $(element));
				applyToElement("x-marg", "margin", $(element));
				applyToElement("x-margin", "margin", $(element));
				applyToElement("x-flo", "float", $(element));
				applyToElement("x-floa", "float", $(element));
				applyToElement("x-float", "float", $(element));
				applyToElement("x-bor", "border", $(element));
				applyToElement("x-bord", "border", $(element));
				applyToElement("x-border", "border", $(element));
			});
		};

	}
	return XPanel;
});
