define("library/x-panel", ["lodash", "jquery"], function(_, $) {
	function XPanel(selector) {

		var self = this;

		var cssAttributes = [];

		var calculateSynonymArray = function(word){
			var synonyms = [];
			var currentSynonym = "";
			for(var index = 0; index < word.length; index++){
				var currentChar = word[index];
				currentSynonym += currentChar;
				if (index >= 1)
					synonyms.push(currentSynonym);
			}
			return synonyms;
		};

		var synonyms = {
			"top" : calculateSynonymArray("top"),
			"left" : calculateSynonymArray("left"),
			"right" : calculateSynonymArray("right"),
			"bottom" : calculateSynonymArray("bottom"),
			"width" : calculateSynonymArray("width"),
			"height" : calculateSynonymArray("height"),
			"padding" : calculateSynonymArray("padding"),
			"margin" : calculateSynonymArray("margin"),
			"position" : calculateSynonymArray("position"),
			"float": calculateSynonymArray("float"),
			"border" : calculateSynonymArray("border")
		};

		var isDefined = function(any) {
			return typeof(any) != "undefined";
		};

		var applyToElement = function(attributeName, asAttributeName, $element){
			var value = $element.attr(attributeName);
			if(isDefined(value)) {
				addCssAttribute(asAttributeName);
				$element.css(asAttributeName, value);
				console.log("XPanel::Applying " + attributeName + "(" + value + ") as '" + asAttributeName + "'' to #" + $element.attr("id"));
			}
		};

		var applyAsDefault = function(attributeName, attributeValue, $element) {
			if (!_(cssAttributes).any(function(a){return a == attributeName})) {
				$element.css(attributeName, attributeValue);
				console.log("XPanel::Applying " + attributeName + "(" + attributeValue + ") as 'default' to #" + $element.attr("id"));
			}
		};

		var resetCssAttributes = function($element){
			cssAttributes = [];
		};

		var addCssAttribute = function(cssAttribute){
			cssAttributes.push(cssAttribute);
		};

		var anyCssAttributes = function(cssAttribute){
			var found = false;
			_.each(cssAttributes, function(compareCssAttribute){
				if (cssAttribute == compareCssAttribute)
					found = true;
			});
			return found;
		};

		var cssAttributesComplete = function($element){
			applyAsDefault("margin", "0", $element);
			applyAsDefault("padding", "0", $element);
		};

		self.render = function(){
			console.log("XPanel::Apply x-panel render() for " + selector);
			$(selector).each(function(index, element){
				resetCssAttributes($(element));
				_(synonyms).each(function(synonymArr, synonym){
					for(var index=0; index < synonymArr.length; index++) {
						var synonymAlias = synonymArr[index];
						applyToElement("x-"+synonymAlias, synonym, $(element));
					}
				});
				cssAttributesComplete($(element));
			});
		};

	}
	return XPanel;
});
