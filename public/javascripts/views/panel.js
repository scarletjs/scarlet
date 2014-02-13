define("views/panel", function() {
	function Panel(selector, style) {

		var self = this;
		self.style = style.getInstance();

		self.animateTitle = function(){
		};

		self.animateLinks = function(){
		};

		self.render = function() {
			self.initialiseSize(2, 2);
		};

		self.initialiseSize = function(numberOfColumns, numberOfRows){
			
			var documentWidth = $(document).width() - (numberOfColumns * 2 * columnPadding);
			var columnWidth = documentWidth / numberOfColumns;
			
			var documentHeight = $(document).height() - (numberOfRows * 2 * rowPadding);
			var rowHeight = documentHeight / numberOfRows;

			$(selector).height(rowHeight);
			$(selector).width(columnWidth);
		};
	}
	return Panel;
});