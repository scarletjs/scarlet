define("views/size", function() {
	function Size(selector, style) {

		var self = this;
		self.style = style.getInstance();
		
		self.preferredWidth = null;
		self.preferredHeight = null;
		
		self.parentWidth = null;
		self.parentHeight = null;

		self.parent = null;

		self.getParent = function(){
			return $(selector);
		}

		self.initialise = function(numberOfColumns, numberOfRows){
			self.parentWidth = $(selector).width();
			self.parentHeight = $(selector).height();

			console.log("Tile::parentWidth = " + self.parentWidth);
			console.log("Tile::parentHeight = " + self.parentHeight);
		}

		self.render = function(numberOfColumns, numberOfRows, templateSelector) {
			//self.initialiseSize(numberOfColumns, numberOfRows);

			console.log("Tile::size(width, height)::" + $(selector).width(), $(selector).height());

			var documentWidth = $(document).width();
			console.log("Document Height:" + documentWidth);

			var documentHeight = $(document).height();
			console.log("Document Height:" + documentHeight);

			var headerHeight = $("#header").outerHeight();
			console.log("Header Height:" + headerHeight);

			var footerHeight = $("#footer").outerHeight();
			console.log("Footer Height:" + footerHeight);

			var preferredHeight = (documentHeight - headerHeight - footerHeight) / numberOfRows;
			var preferredWidth = documentWidth / numberOfColumns;

			//$(selector).height(documentHeight - headerHeight - footerHeight);
			console.log("Setting height to ::" + (documentHeight - headerHeight - footerHeight));

			var component = $(templateSelector).html();
			$(selector).append(component);

			//$(component).width();
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
	return Tile;
});