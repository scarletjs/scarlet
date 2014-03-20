define("library/x-size", function() {
	function XSize(selector, style) {

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

			console.log("XSize::parentWidth = " + self.parentWidth);
			console.log("XSize::parentHeight = " + self.parentHeight);
		}

		self.render = function(numberOfColumns, numberOfRows, templateSelector) {
			//self.initialiseSize(numberOfColumns, numberOfRows);

			console.log("XSize::size(width, height)::" + $(selector).width(), $(selector).height());

			var documentWidth = $(document).width();
			console.log("XSize::Document Height:" + documentWidth);

			var documentHeight = $(document).height();
			console.log("XSize::Document Height:" + documentHeight);

			var headerHeight = $("#header").outerHeight();
			console.log("XSize::Header Height:" + headerHeight);

			var footerHeight = $("#footer").outerHeight();
			console.log("XSize::Footer Height:" + footerHeight);

			var preferredHeight = (documentHeight - headerHeight - footerHeight) / numberOfRows;
			var preferredWidth = documentWidth / numberOfColumns;

			//$(selector).height(documentHeight - headerHeight - footerHeight);
			console.log("XSize::Setting height to ::" + (documentHeight - headerHeight - footerHeight));

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
	return XSize;
});
