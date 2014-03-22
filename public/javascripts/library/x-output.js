define("library/x-output", ["lodash", "jquery"], function(_, $) {
	
	function XOutput(selector) {

		var self = this; 
		self.elements = [];

		self.render = function(elementId, text){
			$(selector).each(function(index, element){
				var id = $(element).attr("id");
				if ("#" + id == elementId)
					$(element).html(text);
			});		
		};
	}
	return XOutput;
});