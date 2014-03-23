define("library/x-get", ["lodash", "jquery"], function(_, $) {
	function XGetElement(element, visitedTag) {

		var self = this;
		self.element = element;
		self.namespace = "x-get-";
		self.uriTag = self.namespace + "uri";
		self.targetTag = self.namespace + "target";
		self.visitedTag = typeof(visitedTag) == "undefined" ? self.namespace + "visited" : self.namespace + visitedTag;

		var isDefined = function(value) {
			return typeof(value) != "undefined"
		};

		self.markAsVisited = function() {
			$(element).attr(self.visitedTag, "yes");
		};

		self.clearVisited = function() {
			$(element).attr(self.visitedTag, "no");
		};

		self.wasVisited = function() {
			return $(element).attr(self.visitedTag) == "yes";
		};

		self.getUri = function() {
			return $(element).attr(self.uriTag);
		};

		self.getTarget = function() {
			return $(element).attr(self.targetTag);
		};

		self.executeGet = function(callback) {
			var uri = self.getUri();
			var target = self.getTarget();
			$(target).html("");
			$.get(uri).done(function(html) {
				if (isDefined(target)) {
					$(target).html("");
					$(target).html(html);
				} else {
					$(element).html("");
					$(element).html(html);
				}
				if (callback)
					callback(self);
			});
		};

		self.click = function(callback) {
			$(element).click(function() {
				if (callback) callback(self);
			});
		};

		self.query = function() {
			return $(element);
		};
	}

	function XGet(selector, visitedTag) {

		var self = this;
		self.namespace = "x-get-";

		self.forEach = function(callback) {
			$(selector).each(function(index, element) {
				var xgetElement = new XGetElement(element, visitedTag);
				if (!xgetElement.wasVisited()) {
					callback(xgetElement);
					xgetElement.markAsVisited();
				}
			});
		};
	}

	return XGet;

});